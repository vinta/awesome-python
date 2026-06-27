import { getReadingList, saveReadingItem, deleteReadingItem } from '../../utils/storage.js';
import { callAnthropic, AGRICULTURE_TAGS } from '../../utils/api.js';

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function safeHref(url) {
  try {
    const u = new URL(url);
    return (u.protocol === 'https:' || u.protocol === 'http:') ? escapeHtml(url) : '#';
  } catch (_) { return '#'; }
}

export function ReadingListModule() {
  let currentTag = 'all';

  return {
    id: 'reading-list',
    label: 'Reading List',

    async render(container) {
      container.innerHTML = `
        <div class="section-heading">Intelligence Sources</div>

        <!-- Save current page -->
        <div class="px-4 mb-3">
          <button id="rl-save-btn"
            class="w-full flex items-center justify-center gap-2 bg-agri-600 hover:bg-agri-700 text-white text-sm font-medium py-2.5 rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Save current page
          </button>
          <div id="rl-save-status" class="text-xs text-center mt-1 min-h-[1rem]" style="color:#3d4f66;"></div>
        </div>

        <!-- Tag filter -->
        <div class="px-4 mb-3 flex gap-1.5 flex-wrap">
          <button data-tag="all" class="tag-filter-btn tag-pill bg-agri-600 text-white">All</button>
          ${AGRICULTURE_TAGS.map((t) => `<button data-tag="${t}" class="tag-filter-btn tag-pill">${t}</button>`).join('')}
        </div>

        <!-- List -->
        <div id="rl-list" class="px-4 pb-4"></div>
      `;

      this._bindEvents(container);
      await this._renderList(container);
    },

    _bindEvents(container) {
      container.querySelector('#rl-save-btn').addEventListener('click', () => this._savePage(container));

      container.querySelectorAll('.tag-filter-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          currentTag = btn.dataset.tag;
          container.querySelectorAll('.tag-filter-btn').forEach((b) => {
            b.classList.remove('bg-agri-600', 'text-white');
            b.classList.add('bg-agri-100', 'text-agri-800');
          });
          btn.classList.add('bg-agri-600', 'text-white');
          btn.classList.remove('bg-agri-100', 'text-agri-800');
          await this._renderList(container);
        });
      });
    },

    async _savePage(container) {
      const status = container.querySelector('#rl-save-status');
      status.textContent = 'Fetching page info…';

      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab) {
        status.textContent = 'No active tab found.';
        return;
      }

      let pageText = '';
      try {
        const resp = await chrome.tabs.sendMessage(tab.id, { type: 'GET_PAGE_INFO' });
        pageText = resp?.text ?? '';
      } catch (_) {
        pageText = '';
      }

      status.textContent = 'Summarising with AI…';
      let summary = '';
      let tags = [];

      try {
        const rawResponse = await callAnthropic({
          system: 'You are an agricultural research assistant. Given web page text, return a JSON object with two fields: "summary" (2-3 sentence plain English summary focused on agricultural relevance) and "tags" (array of relevant tags from: agriculture, equipment, land, carbon, USDA, dairy, finance, weather). Return only valid JSON.',
          userMessage: `Title: ${tab.title}\nURL: ${tab.url}\n\nContent:\n${pageText.slice(0, 4000)}`,
          maxTokens: 256,
        });

        const parsed = JSON.parse(rawResponse);
        summary = parsed.summary ?? '';
        tags = parsed.tags ?? [];
      } catch (_) {
        summary = '(AI summary unavailable)';
        tags = ['agriculture'];
      }

      const item = {
        id: `rl_${Date.now()}`,
        url: tab.url,
        title: tab.title,
        savedAt: new Date().toISOString(),
        summary,
        tags,
      };

      await saveReadingItem(item);
      status.textContent = 'Saved!';
      setTimeout(() => { status.textContent = ''; }, 2000);
      await this._renderList(container);
    },

    async _renderList(container) {
      const list = await getReadingList();
      const filtered = currentTag === 'all' ? list : list.filter((i) => i.tags?.includes(currentTag));
      const listEl = container.querySelector('#rl-list');

      if (filtered.length === 0) {
        listEl.innerHTML = `
          <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p>No saved pages yet.</p>
            <p class="mt-1 text-xs">Browse to a page and click "Save current page".</p>
          </div>`;
        return;
      }

      listEl.innerHTML = filtered.map((item) => `
        <div class="agri-card" data-id="${escapeHtml(item.id)}">
          <div class="flex items-start justify-between gap-2">
            <a href="${safeHref(item.url)}" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-agri-400 hover:underline leading-snug flex-1">${escapeHtml(item.title)}</a>
            <button class="rl-delete-btn text-night-300 hover:text-red-400 transition flex-shrink-0" data-id="${escapeHtml(item.id)}" title="Remove">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          ${item.summary ? `<p class="text-xs text-gray-400 mt-1.5 leading-relaxed">${escapeHtml(item.summary)}</p>` : ''}
          <div class="mt-2">
            ${(item.tags ?? []).map((t) => `<span class="tag-pill">${escapeHtml(t)}</span>`).join('')}
          </div>
          <p class="text-xs text-gray-500 mt-2">${new Date(item.savedAt).toLocaleDateString()}</p>
        </div>
      `).join('');

      listEl.querySelectorAll('.rl-delete-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          await deleteReadingItem(btn.dataset.id);
          await this._renderList(container);
        });
      });
    },
  };
}
