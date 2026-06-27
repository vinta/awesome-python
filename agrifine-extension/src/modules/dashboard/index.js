import {
  getReadingList, getIngestedFiles, getFieldProfiles, buildContextBundle,
} from '../../utils/storage.js';
import { callAnthropic } from '../../utils/api.js';

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const CATEGORIES = ['all', 'land', 'equipment', 'harvest', 'finance', 'carbon', 'weather'];

function tagCategory(item) {
  const tags = item.tags ?? [];
  const data = JSON.stringify(item.structuredData ?? {}).toLowerCase();
  if (tags.includes('land') || data.includes('field') || data.includes('acre')) return 'land';
  if (tags.includes('equipment') || data.includes('equipment')) return 'equipment';
  if (data.includes('harvest') || data.includes('yield')) return 'harvest';
  if (tags.includes('finance') || data.includes('financ') || data.includes('expense')) return 'finance';
  if (tags.includes('carbon') || data.includes('carbon')) return 'carbon';
  if (tags.includes('weather') || data.includes('weather')) return 'weather';
  return 'other';
}

export function DashboardModule() {
  let activeCategory = 'all';
  let keyword = '';
  let aiAnswer = '';
  let aiLoading = false;

  return {
    id: 'dashboard',
    label: 'Dashboard',

    async render(container) {
      container.innerHTML = `
        <div class="section-heading">Farm Dashboard</div>

        <!-- AI Query bar -->
        <div class="px-4 mb-3">
          <div class="flex gap-2">
            <input id="dash-ai-input" type="text" placeholder="Ask anything… e.g. highest yield field?"
              class="ag-input flex-1 rounded-xl" />
            <button id="dash-ai-btn"
              class="bg-agri-600 hover:bg-agri-700 text-white text-sm px-4 py-2 rounded-xl transition flex-shrink-0">
              Ask
            </button>
          </div>
          <div id="dash-ai-answer" class="hidden mt-2 bg-night-700 border border-night-600 rounded-xl p-3 text-sm text-gray-200 leading-relaxed"></div>
        </div>

        <!-- Filters -->
        <div class="px-4 mb-3">
          <div class="flex gap-1.5 flex-wrap mb-2">
            ${CATEGORIES.map((c) => `
              <button data-cat="${c}" class="cat-btn text-xs px-2.5 py-1 rounded-full border transition
                ${c === activeCategory ? 'bg-agri-600 text-white border-agri-600' : 'border-night-500 text-gray-400 hover:border-agri-500'}">
                ${c.charAt(0).toUpperCase() + c.slice(1)}
              </button>`).join('')}
          </div>
          <input id="dash-search" type="text" placeholder="Search by keyword or field name…"
            class="ag-input" />
        </div>

        <!-- Unified list -->
        <div id="dash-list" class="px-4 pb-4"></div>
      `;

      this._bindEvents(container);
      await this._renderDashboard(container);
    },

    _bindEvents(container) {
      container.querySelectorAll('.cat-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          activeCategory = btn.dataset.cat;
          container.querySelectorAll('.cat-btn').forEach((b) => {
            b.className = `cat-btn text-xs px-2.5 py-1 rounded-full border transition border-night-500 text-gray-400 hover:border-agri-500`;
          });
          btn.className = `cat-btn text-xs px-2.5 py-1 rounded-full border transition bg-agri-600 text-white border-agri-600`;
          await this._renderDashboard(container);
        });
      });

      container.querySelector('#dash-search').addEventListener('input', async (e) => {
        keyword = e.target.value.toLowerCase();
        await this._renderDashboard(container);
      });

      container.querySelector('#dash-ai-btn').addEventListener('click', () => this._runAIQuery(container));
      container.querySelector('#dash-ai-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this._runAIQuery(container);
      });
    },

    async _runAIQuery(container) {
      if (aiLoading) return;
      const input = container.querySelector('#dash-ai-input');
      const question = input.value.trim();
      if (!question) return;

      aiLoading = true;
      const answerEl = container.querySelector('#dash-ai-answer');
      answerEl.classList.remove('hidden');
      answerEl.innerHTML = '<span class="spinner"></span> Thinking…';

      try {
        const contextBundle = await buildContextBundle();
        const [readingList, ingestedFiles, fieldProfiles] = await Promise.all([
          getReadingList(), getIngestedFiles(), getFieldProfiles(),
        ]);

        const dataContext = [
          contextBundle,
          '',
          'INGESTED FILES:',
          ingestedFiles.map((f) => `${f.filename}: ${JSON.stringify(f.structuredData ?? {}).slice(0, 400)}`).join('\n') || '(none)',
        ].join('\n');

        const answer = await callAnthropic({
          system: `You are a farm management AI assistant with access to this farm's data:\n\n${dataContext}`,
          userMessage: question,
          maxTokens: 512,
        });

        answerEl.innerHTML = `<p class="font-medium text-agri-400 mb-1">Answer</p><span class="whitespace-pre-wrap">${escapeHtml(answer)}</span>`;
      } catch (err) {
        answerEl.textContent = `Error: ${err.message}`;
      } finally {
        aiLoading = false;
      }
    },

    async _renderDashboard(container) {
      const [readingList, ingestedFiles, fieldProfiles] = await Promise.all([
        getReadingList(), getIngestedFiles(), getFieldProfiles(),
      ]);

      const allItems = [
        ...readingList.map((i) => ({ ...i, _source: 'reading', _category: tagCategory(i) })),
        ...ingestedFiles.map((f) => ({ ...f, _source: 'file', _category: tagCategory(f) })),
        ...fieldProfiles.map((p) => ({
          ...p, _source: 'field', _category: 'land', tags: ['land'],
          title: `Field: ${p.name}`, summary: `${p.acres ?? '?'} ac — ${p.soilType ?? 'unknown soil'}`,
        })),
      ];

      const filtered = allItems.filter((item) => {
        const catMatch = activeCategory === 'all' || item._category === activeCategory;
        const kwMatch = !keyword ||
          (item.title ?? '').toLowerCase().includes(keyword) ||
          (item.summary ?? '').toLowerCase().includes(keyword) ||
          (item.filename ?? '').toLowerCase().includes(keyword) ||
          (item.name ?? '').toLowerCase().includes(keyword);
        return catMatch && kwMatch;
      });

      const listEl = container.querySelector('#dash-list');

      if (filtered.length === 0) {
        listEl.innerHTML = `<div class="empty-state"><p>No data matches your filters.</p></div>`;
        return;
      }

      listEl.innerHTML = filtered.map((item) => {
        const sourceIcon = { reading: '📖', file: '📄', field: '🌱' }[item._source] ?? '•';
        const title = item.title ?? item.filename ?? item.name ?? 'Untitled';
        const sub = item.summary ?? item.preview?.slice(0, 120) ?? '';
        const date = item.savedAt ?? item.uploadedAt ?? item.createdAt ?? '';
        return `
          <div class="agri-card">
            <div class="flex items-start gap-2">
              <span class="text-lg flex-shrink-0">${sourceIcon}</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-white truncate">${escapeHtml(title)}</p>
                ${sub ? `<p class="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">${escapeHtml(sub)}</p>` : ''}
                <div class="flex items-center gap-2 mt-1.5">
                  <span class="tag-pill">${escapeHtml(item._category)}</span>
                  ${(item.tags ?? []).filter((t) => t !== item._category).slice(0, 2).map((t) => `<span class="tag-pill">${escapeHtml(t)}</span>`).join('')}
                  ${date ? `<span class="text-xs text-gray-500">${new Date(date).toLocaleDateString()}</span>` : ''}
                </div>
              </div>
            </div>
          </div>`;
      }).join('');
    },
  };
}
