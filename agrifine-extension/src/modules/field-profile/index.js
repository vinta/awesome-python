import { getFieldProfiles, saveFieldProfile, deleteFieldProfile } from '../../utils/storage.js';
import { getAgRefineUrl, getSyncLog } from '../../utils/agrefine-bridge.js';

export function FieldProfileModule() {
  let showForm = false;
  let expandedId = null;

  return {
    id: 'field-profile',
    label: 'Field Profiles',

    async render(container) {
      container.innerHTML = `
        <div class="section-heading">Field Profiles</div>

        <div class="px-4 mb-3 flex gap-2">
          <button id="fp-new-btn"
            class="flex-1 flex items-center justify-center gap-2 bg-agri-600 hover:bg-agri-700 text-white text-sm font-medium py-2.5 rounded-xl transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Field
          </button>
          <button id="fp-agrefine-sync-btn" title="Pull fields from AG-Refine"
            class="flex items-center justify-center gap-1.5 border border-night-500 text-gray-300 hover:border-agri-500 hover:text-agri-400 text-xs font-medium px-3 py-2.5 rounded-xl transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Pull
          </button>
          <button id="fp-agrefine-push-btn" title="Push fields to AG-Refine"
            class="flex items-center justify-center gap-1.5 border border-night-500 text-gray-300 hover:border-agri-500 hover:text-agri-400 text-xs font-medium px-3 py-2.5 rounded-xl transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Push
          </button>
        </div>
        <div id="fp-sync-status" class="px-4 text-xs min-h-[1rem] mb-2" style="color:#3d4f66;"></div>

        <!-- Create form -->
        <div id="fp-form" class="hidden px-4 mb-4 bg-night-700 border border-night-600 rounded-xl mx-4 p-4">
          <h3 class="text-sm font-semibold text-white mb-3">New Field</h3>
          <div class="space-y-2">
            <input id="fp-name" type="text" placeholder="Field name *" class="ag-input" />
            <input id="fp-clu" type="text" placeholder="CLU ID (optional)" class="ag-input" />
            <div class="flex gap-2">
              <input id="fp-acres" type="number" placeholder="Acres" class="ag-input w-1/2" />
              <input id="fp-soil" type="text" placeholder="Soil type" class="ag-input w-1/2" />
            </div>
            <div class="flex gap-2">
              <input id="fp-lat" type="number" step="any" placeholder="Latitude" class="ag-input w-1/2" />
              <input id="fp-lon" type="number" step="any" placeholder="Longitude" class="ag-input w-1/2" />
            </div>
            <textarea id="fp-notes" rows="2" placeholder="Notes (AI-queryable)"
              class="ag-input resize-none"></textarea>
          </div>
          <div class="flex gap-2 mt-3">
            <button id="fp-save-btn"
              class="flex-1 bg-agri-600 hover:bg-agri-700 text-white text-sm font-medium py-2 rounded-lg transition">
              Save
            </button>
            <button id="fp-cancel-btn"
              class="flex-1 border border-night-500 text-gray-300 text-sm font-medium py-2 rounded-lg hover:bg-night-700 transition">
              Cancel
            </button>
          </div>
        </div>

        <!-- Profiles list -->
        <div id="fp-list" class="px-4 pb-4"></div>

        <!-- Sync log (shown after a sync) -->
        <div id="fp-sync-log" class="hidden px-4 pb-4"></div>
      `;

      this._bindEvents(container);
      await this._renderList(container);
      await this._renderSyncLog(container);
    },

    _bindEvents(container) {
      container.querySelector('#fp-new-btn').addEventListener('click', () => {
        showForm = !showForm;
        container.querySelector('#fp-form').classList.toggle('hidden', !showForm);
      });

      container.querySelector('#fp-agrefine-sync-btn').addEventListener('click', () =>
        this._pullFromAgRefine(container)
      );

      container.querySelector('#fp-agrefine-push-btn').addEventListener('click', () =>
        this._pushToAgRefine(container)
      );

      container.querySelector('#fp-cancel-btn').addEventListener('click', () => {
        showForm = false;
        container.querySelector('#fp-form').classList.add('hidden');
      });

      container.querySelector('#fp-save-btn').addEventListener('click', async () => {
        const name = container.querySelector('#fp-name').value.trim();
        if (!name) return;

        const profile = {
          id: `fp_${Date.now()}`,
          name,
          cluId: container.querySelector('#fp-clu').value.trim() || null,
          acres: parseFloat(container.querySelector('#fp-acres').value) || null,
          soilType: container.querySelector('#fp-soil').value.trim() || null,
          coordinates: {
            lat: parseFloat(container.querySelector('#fp-lat').value) || null,
            lon: parseFloat(container.querySelector('#fp-lon').value) || null,
          },
          notes: container.querySelector('#fp-notes').value.trim() || null,
          cropHistory: [],
          harvestRecords: [],
          weatherData: null,
          carbonPotential: null,
          createdAt: new Date().toISOString(),
          _source: 'manual',
        };

        await saveFieldProfile(profile);
        showForm = false;
        container.querySelector('#fp-form').classList.add('hidden');
        await this._renderList(container);
      });
    },

    async _pullFromAgRefine(container) {
      const statusEl = container.querySelector('#fp-sync-status');
      statusEl.textContent = 'Connecting to AG-Refine…';
      statusEl.style.color = '#3d4f66';

      const result = await chrome.runtime.sendMessage({ type: 'AGREFINE_SYNC' });

      if (!result.ok) {
        statusEl.textContent = `⚠ ${result.error}`;
        statusEl.style.color = '#f87171';
        setTimeout(() => { statusEl.textContent = ''; statusEl.style.color = '#3d4f66'; }, 6000);
        return;
      }

      const parts = [];
      if (result.added) parts.push(`${result.added} field${result.added !== 1 ? 's' : ''} added`);
      if (result.updated) parts.push(`${result.updated} updated`);
      if (result.ticketsPulled) parts.push(`${result.ticketsPulled} tickets`);
      if (result.labSamplesPulled) parts.push(`${result.labSamplesPulled} lab samples`);
      statusEl.textContent = parts.length
        ? `✓ Pull complete — ${parts.join(', ')}`
        : '✓ No new fields in AG-Refine';
      statusEl.style.color = '#4ade80';
      setTimeout(() => { statusEl.textContent = ''; statusEl.style.color = '#3d4f66'; }, 5000);

      await this._renderList(container);
      await this._renderSyncLog(container);
    },

    async _pushToAgRefine(container) {
      const statusEl = container.querySelector('#fp-sync-status');
      statusEl.textContent = 'Pushing to AG-Refine…';
      statusEl.style.color = '#3d4f66';

      const result = await chrome.runtime.sendMessage({ type: 'AGREFINE_PUSH' });

      if (!result.ok) {
        statusEl.textContent = `⚠ ${result.error}`;
        statusEl.style.color = '#f87171';
        setTimeout(() => { statusEl.textContent = ''; statusEl.style.color = '#3d4f66'; }, 6000);
        return;
      }

      statusEl.textContent = result.message
        ? `✓ ${result.message}`
        : `✓ Pushed ${result.pushed} field${result.pushed !== 1 ? 's' : ''} to AG-Refine`;
      statusEl.style.color = '#4ade80';
      setTimeout(() => { statusEl.textContent = ''; statusEl.style.color = '#3d4f66'; }, 4000);
    },

    async _renderSyncLog(container) {
      const log = await getSyncLog();
      const logEl = container.querySelector('#fp-sync-log');

      if (log.length === 0) {
        logEl.classList.add('hidden');
        return;
      }

      const latest = log[0];
      logEl.classList.remove('hidden');
      logEl.innerHTML = `
        <div class="border border-night-600 rounded-xl p-3 text-xs" style="background:#131c2b;">
          <div class="flex items-center justify-between mb-2">
            <span class="font-semibold text-agri-400">AG-Refine Sync Log</span>
            <span class="text-gray-500">${log.length} sync${log.length !== 1 ? 's' : ''}</span>
          </div>
          <div class="space-y-1.5">
            ${log.slice(0, 5).map((entry) => `
              <div class="flex items-start justify-between gap-2 pb-1.5 border-b border-night-600 last:border-0 last:pb-0">
                <div>
                  <span class="text-gray-300">${new Date(entry.at).toLocaleString()}</span>
                  <div class="text-gray-500 mt-0.5">
                    ${entry.fieldsAdded ? `+${entry.fieldsAdded} added` : ''}
                    ${entry.fieldsUpdated ? `${entry.fieldsAdded ? ' · ' : ''}${entry.fieldsUpdated} updated` : ''}
                    ${!entry.fieldsAdded && !entry.fieldsUpdated ? 'No changes' : ''}
                    ${entry.ticketsPulled ? ` · ${entry.ticketsPulled} tickets` : ''}
                    ${entry.labSamplesPulled ? ` · ${entry.labSamplesPulled} lab samples` : ''}
                  </div>
                  ${entry.tabUrl ? `<div class="text-night-300 truncate max-w-[180px]" title="${entry.tabUrl}">${entry.tabUrl.replace(/^https?:\/\//, '').slice(0, 40)}</div>` : ''}
                </div>
                <span class="text-agri-400 flex-shrink-0">↓ Pull</span>
              </div>
            `).join('')}
          </div>
          ${log.length > 5 ? `<p class="text-gray-600 mt-1">${log.length - 5} older entries hidden</p>` : ''}
        </div>
      `;
    },

    async _renderList(container) {
      const profiles = await getFieldProfiles();
      const agRefineUrl = await getAgRefineUrl();
      const listEl = container.querySelector('#fp-list');

      if (profiles.length === 0) {
        listEl.innerHTML = `
          <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No field profiles yet.</p>
            <p class="mt-1 text-xs">Create a profile or sync from AG-Refine.</p>
          </div>`;
        return;
      }

      listEl.innerHTML = profiles.map((p) => {
        const isExpanded = expandedId === p.id;
        const sourceLabel = p._source === 'ag-refine' ? 'AG-Refine'
          : p._source === 'ag-refine-merged' ? 'AG-Refine + manual'
          : p._source === 'manual' ? 'manual'
          : null;

        const cropHistoryHtml = (p.cropHistory ?? []).length > 0
          ? `<div class="mt-2.5">
              <p class="text-agri-400 font-semibold uppercase tracking-wide text-[9px] mb-1">Crop History</p>
              <div class="space-y-0.5">
                ${(p.cropHistory ?? []).slice(0, 5).map((h) => `
                  <div class="flex justify-between">
                    <span>${h.year} — ${h.crop}</span>
                    ${h.yield != null ? `<span class="text-white">${h.yield} ${h.unit ?? 'bu/ac'}</span>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>`
          : '';

        const labHtml = (p.labSamples ?? []).length > 0
          ? `<div class="mt-2.5">
              <p class="text-agri-400 font-semibold uppercase tracking-wide text-[9px] mb-1">Lab / NIR Samples</p>
              <div class="space-y-0.5">
                ${(p.labSamples ?? []).slice(0, 3).map((s) => `
                  <div class="flex justify-between gap-2">
                    <span>${s.date?.slice(0, 10) ?? '?'}</span>
                    <span class="text-white flex-shrink-0 text-right">
                      ${s.dm_pct != null ? `DM ${s.dm_pct}%` : ''}
                      ${s.ndf_pct != null ? ` NDF ${s.ndf_pct}%` : ''}
                      ${s.rfv != null ? ` RFV ${s.rfv}` : ''}
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>`
          : '';

        const harvestHtml = (p.harvestRecords ?? []).length > 0
          ? `<div class="mt-2.5">
              <p class="text-agri-400 font-semibold uppercase tracking-wide text-[9px] mb-1">Harvest Records</p>
              <div class="space-y-0.5">
                ${(p.harvestRecords ?? []).slice(0, 4).map((h) => `
                  <div class="flex justify-between gap-2">
                    <span>${h.date?.slice(0, 10) ?? '?'}${h.commodity ? ` — ${h.commodity}` : h.crop ? ` — ${h.crop}` : ''}</span>
                    <span class="text-white flex-shrink-0">
                      ${h.yield != null ? `${Number(h.yield).toLocaleString()} ${h.unit ?? 'lb'}` : ''}
                      ${h.quality?.dm_pct != null ? ` DM${h.quality.dm_pct}%` : h.moisture != null ? ` @ ${h.moisture}%H` : ''}
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>`
          : '';

        return `
          <div class="agri-card cursor-pointer" data-id="${p.id}">
            <div class="flex items-center justify-between">
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-bold text-white">${p.name}</h3>
                <div class="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                  ${p.acres != null ? `<span class="text-xs text-gray-400">${p.acres} ac</span>` : ''}
                  ${p.soilType ? `<span class="text-xs text-gray-400">${p.soilType}</span>` : ''}
                  ${p.cluId ? `<span class="text-xs text-agri-400">CLU ${p.cluId}</span>` : ''}
                  ${(p.cropHistory ?? []).length > 0 ? `<span class="text-xs text-gray-500">${p.cropHistory.length} yr history</span>` : ''}
                  ${sourceLabel ? `<span class="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded" style="background:#1a2438;color:#3d4f66;">${sourceLabel}</span>` : ''}
                </div>
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                <button class="fp-delete-btn text-night-300 hover:text-red-400 transition" data-id="${p.id}" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <svg class="fp-chevron h-4 w-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <!-- Expanded detail -->
            <div class="fp-detail ${isExpanded ? '' : 'hidden'} mt-3 pt-3 border-t border-night-600 text-xs text-gray-400 space-y-1">
              ${p.coordinates?.lat != null && p.coordinates?.lon != null
                ? `<p>📍 ${p.coordinates.lat.toFixed(4)}, ${p.coordinates.lon.toFixed(4)}</p>`
                : ''}
              ${p.notes ? `<p class="text-gray-300">📝 ${p.notes}</p>` : ''}
              ${cropHistoryHtml}
              ${harvestHtml}
              ${labHtml}
              ${!cropHistoryHtml && !harvestHtml && !labHtml
                ? `<p class="text-gray-600 italic">No crop history yet — ingest a harvest file or pull from AG-Refine.</p>`
                : ''}
              <div class="mt-2.5 pt-2 border-t border-night-600 flex items-center justify-between">
                <p class="text-gray-600">Added ${new Date(p.createdAt).toLocaleDateString()}</p>
                <div class="flex gap-3">
                  ${agRefineUrl ? `<a href="${agRefineUrl}" target="_blank" rel="noopener noreferrer"
                    class="text-agri-400 hover:underline" onclick="event.stopPropagation()">Open in AG-Refine ↗</a>` : ''}
                  <span class="text-gray-600">Carbon: <span class="coming-soon">Phase 7</span></span>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');

      listEl.querySelectorAll('.agri-card').forEach((card) => {
        card.addEventListener('click', async (e) => {
          if (e.target.closest('.fp-delete-btn')) return;
          const id = card.dataset.id;
          expandedId = expandedId === id ? null : id;
          await this._renderList(container);
        });
      });

      listEl.querySelectorAll('.fp-delete-btn').forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          await deleteFieldProfile(btn.dataset.id);
          if (expandedId === btn.dataset.id) expandedId = null;
          await this._renderList(container);
        });
      });
    },
  };
}
