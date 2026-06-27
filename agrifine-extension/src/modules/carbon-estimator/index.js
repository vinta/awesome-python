// Carbon Estimator — Phase 7 stub
// Full implementation: soil organic matter, Scope 3 emissions, USDA NRCS eFOTG API, PDF export

export function CarbonEstimatorModule() {
  return {
    id: 'carbon-estimator',
    label: 'Carbon',

    render(container) {
      container.innerHTML = `
        <div class="section-heading">Carbon Estimator</div>

        <div class="px-4">
          <!-- Phase 7 preview card -->
          <div class="agri-card border-night-600">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-night-600 flex items-center justify-center text-xl">🌿</div>
              <div>
                <h3 class="text-sm font-bold text-white">Carbon Estimator</h3>
                <span class="coming-soon">Coming in Phase 7</span>
              </div>
            </div>
            <p class="text-xs text-gray-400 leading-relaxed">
              The Carbon Estimator will calculate your operation's Scope 3 emissions profile
              and estimate carbon sequestration potential per field using USDA emission factors.
            </p>
          </div>

          <!-- Feature preview list -->
          <div class="space-y-2 mt-2">
            ${[
              ['📊', 'Scope 3 Emissions Profile', 'Based on fuel use, crop type, and animal operations'],
              ['🌱', 'Sequestration Potential', 'Per-field estimate using soil type and land cover'],
              ['🏛️', 'USDA Program Matcher', 'Match your practices to EQIP, CSP, and CRP programs'],
              ['📄', 'Carbon Credit PDF', 'Downloadable eligibility summary for carbon marketplaces'],
              ['📡', 'Marketplace Handoff', 'Send your credit profile to Nori, Pachama, or others (Phase 8)'],
            ].map(([icon, title, desc]) => `
              <div class="flex items-start gap-3 py-2.5 border-b border-night-600 last:border-0">
                <span class="text-base">${icon}</span>
                <div>
                  <p class="text-xs font-semibold text-gray-200">${title}</p>
                  <p class="text-xs text-gray-500">${desc}</p>
                </div>
              </div>`).join('')}
          </div>

          <!-- Notify placeholder -->
          <div class="mt-4 bg-night-800 rounded-xl p-3 text-center">
            <p class="text-xs text-agri-400 font-medium">Your field profile data is already being collected.</p>
            <p class="text-xs text-agri-500 mt-0.5">Carbon estimates will populate automatically when Phase 7 lands.</p>
          </div>
        </div>
      `;
    },
  };
}
