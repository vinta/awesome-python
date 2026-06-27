import { AgrifineAgent } from './agent.js';

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

const SUGGESTED_PROMPTS = [
  'Review all my farm data and build a farm memory summary',
  'What are my current field conditions and harvest windows?',
  'What risks or opportunities do you see across my operation?',
  'Screenshot this page and tell me what agricultural data you see',
  'Export my reading list and field profiles to CSV',
];

export function AgRefineModule() {
  let messages = [];
  let isRunning = false;

  return {
    id: 'ag-refine',
    label: 'AgriAgent',

    async render(container) {
      container.innerHTML = `
        <div class="flex flex-col h-full">

          <!-- Header bar -->
          <div class="px-4 pt-4 pb-2 flex-shrink-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-base">🤖</span>
              <h2 class="text-sm font-bold text-white">AgriAgent</h2>
              <span class="text-xs px-2 py-0.5 rounded-full bg-night-600 text-agri-400 font-medium">AI Agent</span>
            </div>
            <p class="text-xs text-gray-500">Multi-step reasoning over all your farm data</p>
          </div>

          <!-- Chat history -->
          <div id="agent-chat" class="flex-1 overflow-y-auto px-4 py-2 space-y-3"></div>

          <!-- Suggested prompts (shown when empty) -->
          <div id="agent-suggestions" class="px-4 pb-2 flex-shrink-0">
            <p class="text-xs text-gray-500 mb-2">Try asking…</p>
            <div class="flex flex-col gap-1.5">
              ${SUGGESTED_PROMPTS.map((p) => `
                <button class="suggest-btn text-left text-xs bg-night-700 hover:bg-night-600 text-agri-400 px-3 py-2 rounded-lg border border-night-500 transition">
                  ${p}
                </button>`).join('')}
            </div>
          </div>

          <!-- Input bar -->
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
      `;

      this._bindEvents(container);
      this._renderMessages(container);
    },

    _bindEvents(container) {
      const input = container.querySelector('#agent-input');
      const sendBtn = container.querySelector('#agent-send');

      const send = () => {
        const text = input.value.trim();
        if (!text || isRunning) return;
        input.value = '';
        this._runAgent(text, container);
      };

      sendBtn.addEventListener('click', send);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
      });

      container.querySelectorAll('.suggest-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          input.value = btn.textContent.trim();
          send();
        });
      });

      container.querySelector('#agent-clear').addEventListener('click', () => {
        messages = [];
        isRunning = false;
        this._renderMessages(container);
      });
    },

    async _runAgent(userText, container) {
      if (isRunning) return;
      isRunning = true;

      // Hide suggestions
      container.querySelector('#agent-suggestions')?.classList.add('hidden');

      // Add user message
      messages.push({ role: 'user', text: userText });
      this._renderMessages(container);

      // Thinking placeholder
      const thinkingId = `thinking_${Date.now()}`;
      messages.push({ role: 'thinking', id: thinkingId, steps: [] });
      this._renderMessages(container);

      const thinkingMsg = messages[messages.length - 1];

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
            // Replace thinking bubble with final answer
            const idx = messages.findIndex((m) => m.id === thinkingId);
            if (idx >= 0) messages.splice(idx, 1);
            messages.push({ role: 'assistant', text: data });
            isRunning = false;
          } else if (type === 'error') {
            const idx = messages.findIndex((m) => m.id === thinkingId);
            if (idx >= 0) messages.splice(idx, 1);
            messages.push({ role: 'error', text: data });
            isRunning = false;
          }
          this._renderMessages(container);
        },
      });

      try {
        await agent.run(userText);
      } catch (err) {
        const idx = messages.findIndex((m) => m.id === thinkingId);
        if (idx >= 0) messages.splice(idx, 1);
        messages.push({ role: 'error', text: err.message });
        isRunning = false;
        this._renderMessages(container);
      }
    },

    _renderMessages(container) {
      const chat = container.querySelector('#agent-chat');
      if (!chat) return;

      if (messages.length === 0) {
        chat.innerHTML = '';
        container.querySelector('#agent-suggestions')?.classList.remove('hidden');
        return;
      }

      chat.innerHTML = messages.map((msg) => {
        if (msg.role === 'user') {
          return `
            <div class="flex justify-end">
              <div class="max-w-[85%] bg-agri-600 text-white text-sm px-3 py-2 rounded-2xl rounded-tr-sm">
                ${escapeHtml(msg.text)}
              </div>
            </div>`;
        }

        if (msg.role === 'thinking') {
          const steps = msg.steps ?? [];
          return `
            <div class="flex flex-col gap-1.5">
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
          return `
            <div class="flex gap-2 items-start">
              <div class="flex-shrink-0 w-6 h-6 rounded-full bg-night-600 flex items-center justify-center text-xs">🤖</div>
              <div class="flex-1 bg-night-700 border border-night-600 rounded-2xl rounded-tl-sm px-3 py-2.5 text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                ${escapeHtml(msg.text)}
              </div>
            </div>`;
        }

        if (msg.role === 'error') {
          return `
            <div class="text-xs bg-red-900/20 border border-red-900/40 text-red-400 rounded-xl px-3 py-2">
              ⚠️ ${escapeHtml(msg.text)}
            </div>`;
        }

        return '';
      }).join('');

      // Scroll to bottom
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
