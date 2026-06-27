import { getFieldProfiles, saveFieldProfile, deleteFieldProfile } from '../../utils/storage.js';

export function FieldProfileModule() {
  let showForm = false;
  let expandedId = null;

  return {
    id: 'field-profile',
    label: 'Field Profiles',

    async render(container) {
      container.innerHTML = `
        <div class="section-heading">Field Profiles</div>

        <div class="px-4 mb-3">
          <button id="fp-new-btn"
            class="w-full flex items-center justify-center gap-2 bg-agri-600 hover:bg-agri-700 text-white text-sm font-medium py-2.5 rounded-xl transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Field Profile
          </button>
        </div>

        <!-- Create form -->
        <div id="fp-form" class="hidden px-4 mb-4 bg-white border border-gray-200 rounded-xl mx-4 p-4 shadow-sm">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">New Field</h3>
          <div class="space-y-2">
            <input id="fp-name" type="text" placeholder="Field name *"
              class="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-agri-400" />
            <input id="fp-clu" type="text" placeholder="CLU ID (optional)"
              class="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-agri-400" />
            <div class="flex gap-2">
              <input id="fp-acres" type="number" placeholder="Acres"
                class="w-1/2 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-agri-400" />
              <input id="fp-soil" type="text" placeholder="Soil type"
                class="w-1/2 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-agri-400" />
            </div>
            <div class="flex gap-2">
              <input id="fp-lat" type="number" step="any" placeholder="Latitude"
                class="w-1/2 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-agri-400" />
              <input id="fp-lon" type="number" step="any" placeholder="Longitude"
                class="w-1/2 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-agri-400" />
            </div>
            <textarea id="fp-notes" rows="2" placeholder="Notes (AI-queryable)"
              class="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-agri-400 resize-none"></textarea>
          </div>
          <div class="flex gap-2 mt-3">
            <button id="fp-save-btn"
              class="flex-1 bg-agri-600 hover:bg-agri-700 text-white text-sm font-medium py-2 rounded-lg transition">
              Save
            </button>
            <button id="fp-cancel-btn"
              class="flex-1 border border-gray-300 text-gray-600 text-sm font-medium py-2 rounded-lg hover:bg-gray-50 transition">
              Cancel
            </button>
          </div>
        </div>

        <!-- Profiles list -->
        <div id="fp-list" class="px-4 pb-4"></div>
      `;

      this._bindEvents(container);
      await this._renderList(container);
    },

    _bindEvents(container) {
      container.querySelector('#fp-new-btn').addEventListener('click', () => {
        showForm = !showForm;
        container.querySelector('#fp-form').classList.toggle('hidden', !showForm);
      });

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
          cropHistory: [],       // populated from ingested data in Phase 3
          harvestRecords: [],    // populated from ingested CSVs in Phase 3
          weatherData: null,     // Phase 6
          carbonPotential: null, // Phase 7
          createdAt: new Date().toISOString(),
        };

        await saveFieldProfile(profile);
        showForm = false;
        container.querySelector('#fp-form').classList.add('hidden');
        await this._renderList(container);
      });
    },

    async _renderList(container) {
      const profiles = await getFieldProfiles();
      const listEl = container.querySelector('#fp-list');

      if (profiles.length === 0) {
        listEl.innerHTML = `
          <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No field profiles yet.</p>
            <p class="mt-1 text-xs">Create a profile for each field in your operation.</p>
          </div>`;
        return;
      }

      listEl.innerHTML = profiles.map((p) => `
        <div class="agri-card cursor-pointer" data-id="${p.id}">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h3 class="text-sm font-bold text-gray-800">${p.name}</h3>
              <div class="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                ${p.acres ? `<span class="text-xs text-gray-500">${p.acres} ac</span>` : ''}
                ${p.soilType ? `<span class="text-xs text-gray-500">${p.soilType}</span>` : ''}
                ${p.cluId ? `<span class="text-xs text-agri-600">CLU ${p.cluId}</span>` : ''}
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button class="fp-delete-btn text-gray-300 hover:text-red-400 transition" data-id="${p.id}" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <svg class="fp-chevron h-4 w-4 text-gray-400 transition-transform ${expandedId === p.id ? 'rotate-90' : ''}"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <!-- Expanded detail -->
          <div class="fp-detail ${expandedId === p.id ? '' : 'hidden'} mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-1">
            ${p.coordinates?.lat ? `<p>📍 ${p.coordinates.lat.toFixed(4)}, ${p.coordinates.lon.toFixed(4)}</p>` : ''}
            ${p.notes ? `<p>📝 ${p.notes}</p>` : ''}
            <p class="text-gray-300">Weather data: <span class="coming-soon">Phase 6</span></p>
            <p class="text-gray-300">Carbon potential: <span class="coming-soon">Phase 7</span></p>
            <p class="text-gray-300">Added ${new Date(p.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      `).join('');

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
