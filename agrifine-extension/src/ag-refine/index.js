import { AgrifineAgent } from './agent.js';
import { COMMITTEE, runCommitteeAgent } from './committee.js';

const TOOL_ICONS = {
  get_reading_list:      '📖',
  get_field_profiles:    '🌱',
  get_ingested_files:    '📄',
  get_weather:           '🌤️',
  lookup_usda_soil:      '🏛️',
  calculate_gdd:         '📊',
  screenshot_active_tab: '📸',
  get_page_content:      '🔍',
  export_farm_data:      '⬇️',
  open_tab:              '🌐',
  read_tab_content:      '📋',
  get_farm_memory:       '🧠',
  update_farm_memory:    '💾',
};

const AGENT_PROMPTS = [
  'Review all my farm data and build a farm memory summary',
  'What are my current field conditions and harvest windows?',
  'What risks or opportunities do you see across my operation?',
  'Screenshot this page and tell me what agricultural data you see',
  'Export my reading list and field profiles to CSV',
];

const BOARDROOM_PROMPTS = [
  'Weekly operations audit — all departments, give me your status',
  'We have a data integrity issue — assess the impact by department',
  'Heat stress event incoming — what does each department need?',
  'Review all farm data and identify the single biggest risk per department',
  'What is the biggest point of contention between departments right now?',
];

export function AgRefineModule() {
  let mode = 'agent'; // 'agent' | 'boardroom'

  // Agent mode state
  let agentMessages = [];
  let agentRunning = false;

  // Boardroom mode state
  let boardMessages = []; // { type: 'topic'|'report'|'chair'|'thinking', ... }
  let boardRunning = false;
  let boardTargetAgent = null; // null = all, or agent id for targeted response

  return {
    id: 'ag-refine',
    label: 'AgriAgent',

    async render(container) {
      container.innerHTML = this._html();
      this._bindEvents(container);
      this._switchMode(mode, container);
    },

    _html() {
      return `
        <div class="flex flex-col h-full">

          <!-- Mode toggle -->
          <div class="flex-shrink-0 flex border-b border-night-600" style="background:#131c2b;">
            <button data-mode="agent"
              class="mode-btn flex-1 py-2.5 text-xs font-bold uppercase tracking-widest transition">
              Agent
            </button>
            <button data-mode="boardroom"
              class="mode-btn flex-1 py-2.5 text-xs font-bold uppercase tracking-widest transition">
              Boardroom
            </button>
          </div>

          <!-- ── AGENT MODE ── -->
          <div id="panel-agent" class="flex flex-col flex-1 overflow-hidden hidden">

            <div class="px-4 pt-3 pb-2 flex-shrink-0">
              <div class="flex items-center gap-2 mb-0.5">
                <span class="text-base">🤖</span>
                <h2 class="text-sm font-bold text-white">AgriAgent</h2>
                <span class="text-xs px-2 py-0.5 rounded-full bg-night-600 text-agri-400 font-medium">AI Agent</span>
              </div>
              <p class="text-xs text-gray-500">Multi-step reasoning over all your farm data</p>
            </div>

            <div id="agent-chat" class="flex-1 overflow-y-auto px-4 py-2 space-y-3"></div>

            <div id="agent-suggestions" class="px-4 pb-2 flex-shrink-0">
              <p class="text-xs text-gray-500 mb-2">Try asking…</p>
              <div class="flex flex-col gap-1.5">
                ${AGENT_PROMPTS.map((p) => `
                  <button class="agent-suggest-btn text-left text-xs bg-night-700 hover:bg-night-600 text-agri-400 px-3 py-2 rounded-lg border border-night-500 transition">
                    ${p}
                  </button>`).join('')}
              </div>
            </div>

            <div class="flex-shrink-0 border-t border-night-600 px-3 py-3">
              <div class="flex gap-2 items-end">
                <textarea id="agent-input" rows="2"
                  placeholder="Ask the agent anything about your farm…"
                  class="ag-input flex-1 rounded-xl resize-none"></textarea>
                <button id="agent-send"
                  class="flex-shrink-0 bg-agri-600 hover:bg-agri-700 disabled:bg-night-500 text-white rounded-xl px-3 py-2 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <button id="agent-clear" class="text-xs text-gray-500 hover:text-gray-300 mt-1 transition">Clear conversation</button>
            </div>
          </div>

          <!-- ── BOARDROOM MODE ── -->
          <div id="panel-boardroom" class="flex flex-col flex-1 overflow-hidden hidden">

            <!-- Committee roster -->
            <div class="flex-shrink-0 px-4 pt-3 pb-2">
              <div class="flex items-center gap-1.5 mb-2">
                <span class="text-sm">🏛️</span>
                <h2 class="text-sm font-bold text-white">The Boardroom</h2>
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${COMMITTEE.map((a) => `
                  <div class="flex items-center gap-1 px-2 py-1 rounded-lg border text-xs"
                    style="border-color:${a.borderColor}22;background:${a.accentColor}11;">
                    <span>${a.emoji}</span>
                    <span style="color:${a.accentColor};">${a.name}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Meeting transcript -->
            <div id="board-chat" class="flex-1 overflow-y-auto px-4 py-2 space-y-3"></div>

            <!-- Suggested meeting topics (when empty) -->
            <div id="board-suggestions" class="px-4 pb-2 flex-shrink-0">
              <p class="text-xs text-gray-500 mb-2">Call the meeting to order…</p>
              <div class="flex flex-col gap-1.5">
                ${BOARDROOM_PROMPTS.map((p) => `
                  <button class="board-suggest-btn text-left text-xs bg-night-700 hover:bg-night-600 text-agri-400 px-3 py-2 rounded-lg border border-night-500 transition">
                    ${p}
                  </button>`).join('')}
              </div>
            </div>

            <!-- Input bar -->
            <div class="flex-shrink-0 border-t border-night-600 px-3 py-3">
              <!-- Agent selector for targeted follow-ups -->
              <div id="board-target-bar" class="hidden flex gap-1.5 mb-2 flex-wrap">
                <span class="text-[9px] uppercase tracking-widest text-gray-500 self-center mr-0.5">Address:</span>
                <button data-target="all" class="target-btn active-target text-[9px] px-2 py-1 rounded border border-agri-600 text-agri-400 transition">All</button>
                ${COMMITTEE.map((a) => `
                  <button data-target="${a.id}" class="target-btn text-[9px] px-2 py-1 rounded border border-night-500 transition" style="color:${a.accentColor}66;">
                    ${a.name.split(' ')[0]}
                  </button>
                `).join('')}
              </div>

              <div class="flex gap-2 items-end">
                <textarea id="board-input" rows="2"
                  placeholder="State the meeting topic, or ask a follow-up…"
                  class="ag-input flex-1 rounded-xl resize-none"></textarea>
                <button id="board-send"
                  class="flex-shrink-0 bg-agri-600 hover:bg-agri-700 disabled:bg-night-500 text-white rounded-xl px-3 py-2 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <button id="board-clear" class="text-xs text-gray-500 hover:text-gray-300 mt-1 transition">Clear meeting</button>
            </div>
          </div>

        </div>
      `;
    },

    _switchMode(newMode, container) {
      mode = newMode;
      container.querySelector('#panel-agent').classList.toggle('hidden', mode !== 'agent');
      container.querySelector('#panel-boardroom').classList.toggle('hidden', mode !== 'boardroom');

      container.querySelectorAll('.mode-btn').forEach((btn) => {
        const active = btn.dataset.mode === mode;
        btn.style.color = active ? '#22c55e' : '#3d4f66';
        btn.style.borderBottom = active ? '2px solid #22c55e' : '2px solid transparent';
      });
    },

    _bindEvents(container) {
      // Mode toggle
      container.querySelectorAll('.mode-btn').forEach((btn) => {
        btn.addEventListener('click', () => this._switchMode(btn.dataset.mode, container));
      });

      // ── Agent mode ──
      const agentInput = container.querySelector('#agent-input');
      const agentSend = container.querySelector('#agent-send');

      const sendAgent = () => {
        const text = agentInput.value.trim();
        if (!text || agentRunning) return;
        agentInput.value = '';
        this._runAgent(text, container);
      };

      agentSend.addEventListener('click', sendAgent);
      agentInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAgent(); }
      });

      container.querySelectorAll('.agent-suggest-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          agentInput.value = btn.textContent.trim();
          sendAgent();
        });
      });

      container.querySelector('#agent-clear').addEventListener('click', () => {
        agentMessages = [];
        agentRunning = false;
        this._renderAgentMessages(container);
      });

      // ── Boardroom mode ──
      const boardInput = container.querySelector('#board-input');
      const boardSend = container.querySelector('#board-send');

      const sendBoard = () => {
        const text = boardInput.value.trim();
        if (!text || boardRunning) return;
        boardInput.value = '';
        this._runBoardroom(text, container);
      };

      boardSend.addEventListener('click', sendBoard);
      boardInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendBoard(); }
      });

      container.querySelectorAll('.board-suggest-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          boardInput.value = btn.textContent.trim();
          sendBoard();
        });
      });

      container.querySelector('#board-clear').addEventListener('click', () => {
        boardMessages = [];
        boardRunning = false;
        boardTargetAgent = null;
        container.querySelector('#board-target-bar').classList.add('hidden');
        this._renderBoardMessages(container);
      });

      // Target agent selector
      container.querySelectorAll('.target-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          boardTargetAgent = btn.dataset.target === 'all' ? null : btn.dataset.target;
          container.querySelectorAll('.target-btn').forEach((b) => {
            b.classList.toggle('active-target', b.dataset.target === (boardTargetAgent ?? 'all'));
            b.style.borderColor = b.classList.contains('active-target') ? '#22c55e' : '';
            if (!b.classList.contains('active-target')) b.style.borderColor = '#253047';
          });
        });
      });
    },

    // ── Agent mode logic ──────────────────────────────────────────────────────

    async _runAgent(userText, container) {
      if (agentRunning) return;
      agentRunning = true;

      container.querySelector('#agent-suggestions')?.classList.add('hidden');
      agentMessages.push({ role: 'user', text: userText });
      this._renderAgentMessages(container);

      const thinkingId = `thinking_${Date.now()}`;
      agentMessages.push({ role: 'thinking', id: thinkingId, steps: [] });
      this._renderAgentMessages(container);

      const thinkingMsg = agentMessages[agentMessages.length - 1];

      const agent = new AgrifineAgent({
        onEvent: ({ type, data }) => {
          if (type === 'thinking') {
            thinkingMsg.steps.push({ type: 'status', text: data });
          } else if (type === 'tool_call') {
            thinkingMsg.steps.push({
              type: 'tool',
              icon: TOOL_ICONS[data.name] ?? '🔧',
              name: data.name.replace(/_/g, ' '),
              input: JSON.stringify(data.input),
            });
          } else if (type === 'tool_result') {
            const last = thinkingMsg.steps[thinkingMsg.steps.length - 1];
            if (last?.type === 'tool') last.done = true;
          } else if (type === 'answer') {
            const idx = agentMessages.findIndex((m) => m.id === thinkingId);
            if (idx >= 0) agentMessages.splice(idx, 1);
            agentMessages.push({ role: 'assistant', text: data });
            agentRunning = false;
          } else if (type === 'error') {
            const idx = agentMessages.findIndex((m) => m.id === thinkingId);
            if (idx >= 0) agentMessages.splice(idx, 1);
            agentMessages.push({ role: 'error', text: data });
            agentRunning = false;
          }
          this._renderAgentMessages(container);
        },
      });

      try {
        await agent.run(userText);
      } catch (err) {
        const idx = agentMessages.findIndex((m) => m.id === thinkingId);
        if (idx >= 0) agentMessages.splice(idx, 1);
        agentMessages.push({ role: 'error', text: err.message });
        agentRunning = false;
        this._renderAgentMessages(container);
      }
    },

    _renderAgentMessages(container) {
      const chat = container.querySelector('#agent-chat');
      if (!chat) return;

      if (agentMessages.length === 0) {
        chat.innerHTML = '';
        container.querySelector('#agent-suggestions')?.classList.remove('hidden');
        return;
      }

      chat.innerHTML = agentMessages.map((msg) => {
        if (msg.role === 'user') {
          return `<div class="flex justify-end">
            <div class="max-w-[85%] bg-agri-600 text-white text-sm px-3 py-2 rounded-2xl rounded-tr-sm">
              ${escapeHtml(msg.text)}
            </div>
          </div>`;
        }
        if (msg.role === 'thinking') {
          const steps = msg.steps ?? [];
          return `<div class="flex flex-col gap-1.5">
            ${steps.map((step) => {
              if (step.type === 'status') {
                return `<div class="flex items-center gap-1.5 text-xs text-gray-500">
                  <span class="spinner flex-shrink-0"></span> ${escapeHtml(step.text)}
                </div>`;
              }
              if (step.type === 'tool') {
                return `<div class="flex items-center gap-2 text-xs bg-night-700 border border-night-600 rounded-lg px-3 py-1.5">
                  <span>${step.icon}</span>
                  <span class="font-medium text-agri-400">${step.name}</span>
                  ${step.done ? '<span class="ml-auto text-agri-500">✓</span>' : '<span class="spinner ml-auto flex-shrink-0"></span>'}
                </div>`;
              }
              return '';
            }).join('')}
            ${steps.length === 0 ? '<div class="flex items-center gap-1.5 text-xs text-gray-500"><span class="spinner"></span> Starting…</div>' : ''}
          </div>`;
        }
        if (msg.role === 'assistant') {
          return `<div class="flex gap-2 items-start">
            <div class="flex-shrink-0 w-6 h-6 rounded-full bg-night-600 flex items-center justify-center text-xs">🤖</div>
            <div class="flex-1 bg-night-700 border border-night-600 rounded-2xl rounded-tl-sm px-3 py-2.5 text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">${escapeHtml(msg.text)}</div>
          </div>`;
        }
        if (msg.role === 'error') {
          return `<div class="text-xs bg-red-900/20 border border-red-900/40 text-red-400 rounded-xl px-3 py-2">⚠️ ${escapeHtml(msg.text)}</div>`;
        }
        return '';
      }).join('');

      chat.scrollTop = chat.scrollHeight;
    },

    // ── Boardroom mode logic ──────────────────────────────────────────────────

    async _runBoardroom(topic, container) {
      if (boardRunning) return;
      boardRunning = true;

      container.querySelector('#board-suggestions')?.classList.add('hidden');

      // Add chair statement
      boardMessages.push({ type: 'chair', text: topic });
      this._renderBoardMessages(container);

      // Determine which agents respond
      const agentsToRun = boardTargetAgent
        ? COMMITTEE.filter((a) => a.id === boardTargetAgent)
        : COMMITTEE;

      // Build context: full prior statements from this meeting for sequential passing
      const priorStatements = boardMessages
        .filter((m) => m.type === 'report' && m.text)
        .map((m) => ({ name: m.agent.name, role: m.agent.role, text: m.text }));

      // Add thinking placeholders for each agent that will speak
      for (const agent of agentsToRun) {
        boardMessages.push({ type: 'thinking', agentId: agent.id, agent });
      }
      this._renderBoardMessages(container);

      // Run agents sequentially so each gets the prior context
      for (const agent of agentsToRun) {
        const msgIdx = boardMessages.findIndex(
          (m) => m.type === 'thinking' && m.agentId === agent.id
        );

        // Convert thinking → streaming report
        const reportMsg = { type: 'report', agent, text: '', streaming: true };
        if (msgIdx >= 0) boardMessages.splice(msgIdx, 1, reportMsg);
        this._renderBoardMessages(container);

        try {
          await runCommitteeAgent(agent, topic, priorStatements, (chunk, fullText) => {
            reportMsg.text = fullText;
            this._renderBoardMessages(container);
          });
          reportMsg.streaming = false;
          priorStatements.push({ name: agent.name, role: agent.role, text: reportMsg.text });
        } catch (err) {
          boardMessages.splice(boardMessages.indexOf(reportMsg), 1, {
            type: 'error',
            text: `${agent.name}: ${err.message}`,
          });
        }
        this._renderBoardMessages(container);
      }

      boardRunning = false;

      // Show target bar after the first meeting round
      if (boardMessages.some((m) => m.type === 'report')) {
        container.querySelector('#board-target-bar').classList.remove('hidden');
      }
      this._renderBoardMessages(container);
    },

    _renderBoardMessages(container) {
      const chat = container.querySelector('#board-chat');
      if (!chat) return;

      if (boardMessages.length === 0) {
        chat.innerHTML = '';
        container.querySelector('#board-suggestions')?.classList.remove('hidden');
        return;
      }

      chat.innerHTML = boardMessages.map((msg) => {
        if (msg.type === 'chair') {
          return `
            <div class="flex justify-end">
              <div class="max-w-[85%] bg-agri-600 text-white text-xs px-3 py-2 rounded-2xl rounded-tr-sm">
                <div class="text-[9px] uppercase tracking-widest text-agri-200 mb-1 font-semibold">Chair · David</div>
                ${escapeHtml(msg.text)}
              </div>
            </div>`;
        }

        if (msg.type === 'thinking') {
          const a = msg.agent;
          return `
            <div class="rounded-xl border border-night-600 overflow-hidden" style="border-left-color:${a.accentColor}44;border-left-width:3px;">
              <div class="px-3 pt-2.5 pb-1 flex items-center gap-2" style="background:#131c2b;">
                <span>${a.emoji}</span>
                <span class="text-xs font-bold" style="color:${a.accentColor};">${a.name}</span>
                <span class="text-[9px] uppercase tracking-widest text-gray-500">${a.role}</span>
                <span class="spinner ml-auto flex-shrink-0"></span>
              </div>
              <div class="px-3 py-2 text-xs text-gray-500 italic" style="background:#0f1621;">
                Reviewing data…
              </div>
            </div>`;
        }

        if (msg.type === 'report') {
          const a = msg.agent;
          return `
            <div class="rounded-xl border border-night-600 overflow-hidden" style="border-left-color:${a.accentColor};border-left-width:3px;">
              <div class="px-3 pt-2.5 pb-1 flex items-center gap-2" style="background:#131c2b;">
                <span>${a.emoji}</span>
                <span class="text-xs font-bold" style="color:${a.accentColor};">${a.name}</span>
                <span class="text-[9px] uppercase tracking-widest text-gray-500">${a.role}</span>
                ${msg.streaming ? '<span class="spinner ml-auto flex-shrink-0"></span>' : ''}
              </div>
              <div class="px-3 py-2.5 text-xs text-gray-200 leading-relaxed whitespace-pre-wrap" style="background:#0f1621;">
                ${escapeHtml(msg.text || '…')}
              </div>
            </div>`;
        }

        if (msg.type === 'error') {
          return `<div class="text-xs bg-red-900/20 border border-red-900/40 text-red-400 rounded-xl px-3 py-2">⚠️ ${escapeHtml(msg.text)}</div>`;
        }

        return '';
      }).join('');

      chat.scrollTop = chat.scrollHeight;
    },
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
