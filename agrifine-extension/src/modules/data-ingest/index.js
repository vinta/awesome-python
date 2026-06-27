import { getIngestedFiles, saveIngestedFile, deleteIngestedFile, getFieldProfiles, saveFieldProfile } from '../../utils/storage.js';
import { callAnthropic } from '../../utils/api.js';

const SUPPORTED_TYPES = {
  'text/csv': 'CSV',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
  'application/vnd.ms-excel': 'Excel',
  'application/pdf': 'PDF',
};

const DOC_SERVER = 'http://localhost:7432';

async function tryDocServer(file) {
  try {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch(`${DOC_SERVER}/parse`, { method: 'POST', body: fd });
    if (!res.ok) return null;
    const { text } = await res.json();
    return text ?? null;
  } catch (_) {
    return null;
  }
}

export function DataIngestModule() {
  return {
    id: 'data-ingest',
    label: 'Data Ingest',

    async render(container) {
      container.innerHTML = `
        <div class="section-heading">Data Ingest</div>

        <!-- Drop zone -->
        <div class="px-4 mb-4">
          <div id="drop-zone"
            class="border-2 border-dashed border-night-500 rounded-xl p-6 text-center cursor-pointer hover:border-agri-500 hover:bg-night-800 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-agri-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="text-sm font-medium text-gray-300">Drop CSV, Excel, or PDF here</p>
            <p class="text-xs text-gray-500 mt-1">or click to select a file</p>
            <input id="file-input" type="file" accept=".csv,.xlsx,.xls,.pdf" class="hidden" />
          </div>
          <div id="ingest-status" class="text-xs text-center text-gray-500 mt-2 min-h-[1rem]"></div>
        </div>

        <!-- Field import banner (shown after processing if field data found) -->
        <div id="field-import-banner" class="hidden px-4 mb-3">
          <div class="bg-night-700 border border-agri-600 rounded-xl p-3">
            <p class="text-xs font-semibold text-agri-400 mb-1">Field data detected</p>
            <p id="field-import-desc" class="text-xs text-gray-400 mb-2"></p>
            <p id="field-import-status" class="text-xs text-gray-500 mb-2 hidden"></p>
            <button id="import-to-fields-btn"
              class="w-full bg-agri-600 hover:bg-agri-700 text-white text-xs font-medium py-1.5 rounded-lg transition">
              Import harvest data to field profiles
            </button>
          </div>
        </div>

        <!-- File list -->
        <div id="file-list" class="px-4 pb-4"></div>
      `;

      this._pendingImport = null;
      this._bindEvents(container);
      await this._renderFileList(container);
    },

    _bindEvents(container) {
      const dropZone = container.querySelector('#drop-zone');
      const fileInput = container.querySelector('#file-input');

      dropZone.addEventListener('click', () => fileInput.click());

      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-agri-500', 'bg-night-800');
      });

      dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-agri-500', 'bg-night-800');
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-agri-500', 'bg-night-800');
        const file = e.dataTransfer.files[0];
        if (file) this._processFile(file, container);
      });

      fileInput.addEventListener('change', () => {
        if (fileInput.files[0]) this._processFile(fileInput.files[0], container);
      });

      container.querySelector('#import-to-fields-btn').addEventListener('click', () =>
        this._importToFields(container)
      );
    },

    async _processFile(file, container) {
      const status = container.querySelector('#ingest-status');
      const typeName = SUPPORTED_TYPES[file.type]
        ?? (file.name.endsWith('.csv') ? 'CSV'
          : (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) ? 'Excel'
          : null);

      if (!typeName) {
        status.textContent = 'Unsupported file type.';
        return;
      }

      // Hide previous import banner
      container.querySelector('#field-import-banner').classList.add('hidden');
      this._pendingImport = null;

      status.textContent = `Parsing ${typeName}…`;
      let extractedText = '';

      // Try Python doc server first (more robust), fall back to browser-side
      extractedText = await tryDocServer(file);
      if (extractedText) {
        status.textContent = `Parsed via Python server…`;
      } else {
        try {
          if (typeName === 'CSV') {
            extractedText = await this._parseCSV(file);
          } else if (typeName === 'Excel') {
            extractedText = await this._parseExcel(file);
          } else if (typeName === 'PDF') {
            extractedText = await this._parsePDF(file);
          }
        } catch (err) {
          status.textContent = `Parse error: ${err.message}`;
          return;
        }
      }

      status.textContent = 'Extracting structured data with AI…';
      let structuredData = null;

      try {
        const raw = await callAnthropic({
          system: 'You are an agricultural data analyst. Extract and return structured JSON from this document. Identify: operation type, field names (as "fields" array of strings), dates, quantities, equipment, crop types, financial figures, and any carbon or emissions data. For harvest data include avg_yield_bu_ac, avg_moisture_pct, harvest_date, and crop. Return only valid JSON.',
          userMessage: extractedText.slice(0, 6000),
          maxTokens: 1024,
        });
        structuredData = JSON.parse(raw);
      } catch (err) {
        const isNoKey = err.message?.toLowerCase().includes('no api key') ||
          err.message?.toLowerCase().includes('api key set');
        structuredData = {
          raw_text: extractedText.slice(0, 6000), // preserved for re-extraction
          parse_error: isNoKey ? 'no_api_key' : 'ai_error',
        };
        if (isNoKey) {
          status.textContent = '⚙ Set API key in Settings to extract data';
        }
      }

      const record = {
        id: `file_${Date.now()}`,
        filename: file.name,
        type: typeName,
        uploadedAt: new Date().toISOString(),
        structuredData,
        preview: Object.entries(structuredData ?? {})
          .filter(([k]) => k !== 'raw_preview' && k !== 'raw_text' && k !== 'parse_error')
          .slice(0, 5)
          .map(([k, v]) => `${k}: ${JSON.stringify(v).slice(0, 80)}`)
          .join('\n'),
      };

      await saveIngestedFile(record);
      status.textContent = 'File processed!';
      setTimeout(() => { status.textContent = ''; }, 2000);
      await this._renderFileList(container);

      // Offer to import field data if field names were found
      await this._offerFieldImport(record, container);
    },

    async _offerFieldImport(record, container) {
      const sd = record.structuredData;
      if (!sd || sd.parse_error) return;

      // Collect field names from multiple possible keys
      const rawFields = [
        ...(Array.isArray(sd.fields) ? sd.fields : []),
        ...(Array.isArray(sd.field_names) ? sd.field_names : []),
      ].map((f) => String(f).trim()).filter(Boolean);

      if (rawFields.length === 0) return;

      const profiles = await getFieldProfiles();
      const matched = rawFields.filter((name) =>
        profiles.some((p) => p.name.toLowerCase() === name.toLowerCase())
      );

      if (matched.length === 0) return;

      this._pendingImport = { record, matched };

      const banner = container.querySelector('#field-import-banner');
      const desc = container.querySelector('#field-import-desc');
      const btn = container.querySelector('#import-to-fields-btn');
      const importStatus = container.querySelector('#field-import-status');

      desc.textContent = `Found harvest data for: ${matched.join(', ')}`;
      importStatus.classList.add('hidden');
      btn.disabled = false;
      btn.textContent = 'Import harvest data to field profiles';
      btn.style.opacity = '';
      banner.classList.remove('hidden');
    },

    async _importToFields(container) {
      if (!this._pendingImport) return;

      const { record, matched } = this._pendingImport;
      const sd = record.structuredData;
      const importStatus = container.querySelector('#field-import-status');
      const btn = container.querySelector('#import-to-fields-btn');

      btn.disabled = true;
      btn.textContent = 'Importing…';
      importStatus.textContent = '';
      importStatus.classList.remove('hidden');

      const profiles = await getFieldProfiles();
      let count = 0;

      for (const fieldName of matched) {
        const profile = profiles.find((p) => p.name.toLowerCase() === fieldName.toLowerCase());
        if (!profile) continue;

        const harvestDate = sd.harvest_date ?? sd.date ?? new Date().toISOString().slice(0, 10);
        const cropYear = parseInt(harvestDate.slice(0, 4), 10);
        const crop = sd.crop ?? sd.operation_type?.replace(/\s*harvest\s*/i, '').trim() ?? 'Unknown';
        const yieldVal = sd.avg_yield_bu_ac ?? sd.yield_bu_ac ?? sd.yield ?? null;
        const moisture = sd.avg_moisture_pct ?? sd.moisture_pct ?? null;

        const harvestRecord = {
          date: harvestDate,
          crop,
          yield: yieldVal ? parseFloat(yieldVal) : null,
          unit: 'bu/ac',
          moisture: moisture ? parseFloat(moisture) : null,
          source: record.filename,
        };

        const cropHistoryEntry = {
          year: cropYear,
          crop,
          yield: harvestRecord.yield,
          unit: 'bu/ac',
        };

        const existingHarvests = profile.harvestRecords ?? [];
        const existingHistory = profile.cropHistory ?? [];

        const updated = {
          ...profile,
          harvestRecords: [
            harvestRecord,
            ...existingHarvests.filter((r) => !(r.date === harvestRecord.date && r.crop === harvestRecord.crop)),
          ],
          cropHistory: [
            cropHistoryEntry,
            ...existingHistory.filter((r) => !(r.year === cropHistoryEntry.year && r.crop === cropHistoryEntry.crop)),
          ].sort((a, b) => b.year - a.year),
        };

        await saveFieldProfile(updated);
        count++;
      }

      importStatus.textContent = `✓ Updated ${count} field profile${count !== 1 ? 's' : ''} — check Fields tab`;
      importStatus.style.color = '#4ade80';
      importStatus.classList.remove('hidden');
      btn.textContent = 'Imported';
      btn.style.opacity = '0.5';
      this._pendingImport = null;
    },

    _parseCSV(file) {
      return new Promise((resolve, reject) => {
        import('papaparse').then(({ default: Papa }) => {
          Papa.parse(file, {
            complete: (results) => {
              const rows = results.data.slice(0, 200);
              resolve(rows.map((r) => r.join(',')).join('\n'));
            },
            error: reject,
          });
        });
      });
    },

    _parseExcel(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const { read, utils } = await import('xlsx');
            const wb = read(e.target.result, { type: 'array' });
            const lines = [];
            wb.SheetNames.slice(0, 3).forEach((name) => {
              const ws = wb.Sheets[name];
              lines.push(`Sheet: ${name}`);
              lines.push(utils.sheet_to_csv(ws).split('\n').slice(0, 100).join('\n'));
            });
            resolve(lines.join('\n'));
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    },

    _parsePDF(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const pdfjsLib = await import('pdfjs-dist');
            pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL('pdf.worker.js');
            const loadingTask = pdfjsLib.getDocument({
              data: new Uint8Array(e.target.result),
              useWorkerFetch: false,
              isEvalSupported: false,
              useSystemFonts: true,
            });
            const pdf = await loadingTask.promise;
            const pages = Math.min(pdf.numPages, 10);
            const texts = [];
            for (let i = 1; i <= pages; i++) {
              const page = await pdf.getPage(i);
              const content = await page.getTextContent();
              texts.push(content.items.map((s) => s.str).join(' '));
            }
            resolve(texts.join('\n'));
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    },

    async _renderFileList(container) {
      const files = await getIngestedFiles();
      const listEl = container.querySelector('#file-list');

      if (files.length === 0) {
        listEl.innerHTML = `
          <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>No files ingested yet.</p>
            <p class="mt-1 text-xs">Upload a CSV, Excel, or PDF file above.</p>
          </div>`;
        return;
      }

      listEl.innerHTML = files.map((f) => {
        const parseError = f.structuredData?.parse_error;
        let cardFooter = '';
        if (parseError === 'no_api_key') {
          cardFooter = `
            <div class="mt-2 flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-xs" style="background:#1a1a0a;border:1px solid #92400e;">
              <span class="text-amber-400">⚙ Add API key in Settings to extract</span>
              <button class="reextract-btn text-agri-400 hover:text-agri-300 font-medium flex-shrink-0" data-id="${f.id}">Extract now</button>
            </div>`;
        } else if (parseError === 'ai_error') {
          cardFooter = `
            <div class="mt-2 flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-xs" style="background:#1a0a0a;border:1px solid #7f1d1d;">
              <span class="text-red-400">AI extraction failed</span>
              <button class="reextract-btn text-agri-400 hover:text-agri-300 font-medium flex-shrink-0" data-id="${f.id}">Retry</button>
            </div>`;
        } else if (f.preview) {
          cardFooter = `<pre class="text-xs text-gray-400 mt-2 whitespace-pre-wrap bg-night-800 rounded p-2 overflow-hidden max-h-20">${f.preview}</pre>`;
        }
        const fieldLink = this._hasFieldData(f)
          ? `<p class="text-xs text-agri-400 mt-1.5">↗ Contains field data · <button class="reimport-btn underline hover:no-underline" data-id="${f.id}">Re-import to profiles</button></p>`
          : '';

        return `
          <div class="agri-card" data-id="${f.id}">
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1">
                <span class="text-xs font-bold uppercase tracking-wide text-agri-400">${f.type}</span>
                <p class="text-sm font-semibold text-white leading-snug mt-0.5">${f.filename}</p>
                <p class="text-xs text-gray-500 mt-0.5">${new Date(f.uploadedAt).toLocaleDateString()}</p>
              </div>
              <button class="file-delete-btn text-night-300 hover:text-red-400 transition flex-shrink-0" data-id="${f.id}" title="Remove">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            ${cardFooter}
            ${fieldLink}
          </div>`;
      }).join('');

      listEl.querySelectorAll('.file-delete-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          await deleteIngestedFile(btn.dataset.id);
          await this._renderFileList(container);
        });
      });

      listEl.querySelectorAll('.reimport-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const file = files.find((f) => f.id === btn.dataset.id);
          if (file) await this._offerFieldImport(file, container);
        });
      });

      listEl.querySelectorAll('.reextract-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const file = files.find((f) => f.id === btn.dataset.id);
          if (file) await this._reExtractFile(file, container);
        });
      });
    },

    async _reExtractFile(file, container) {
      const status = container.querySelector('#ingest-status');
      const rawText = file.structuredData?.raw_text ?? file.structuredData?.raw_preview ?? '';

      if (!rawText) {
        status.textContent = 'No cached text — please re-upload the file.';
        setTimeout(() => { status.textContent = ''; }, 4000);
        return;
      }

      status.textContent = `Re-extracting ${file.filename}…`;
      let structuredData = null;

      try {
        const raw = await callAnthropic({
          system: 'You are an agricultural data analyst. Extract and return structured JSON from this document. Identify: operation type, field names (as "fields" array of strings), dates, quantities, equipment, crop types, financial figures, and any carbon or emissions data. For harvest data include avg_yield_bu_ac, avg_moisture_pct, harvest_date, and crop. Return only valid JSON.',
          userMessage: rawText.slice(0, 6000),
          maxTokens: 1024,
        });
        structuredData = JSON.parse(raw);
      } catch (err) {
        const isNoKey = err.message?.toLowerCase().includes('no api key') ||
          err.message?.toLowerCase().includes('api key set');
        status.textContent = isNoKey
          ? '⚙ API key required — open Settings (gear icon) to add your Anthropic key.'
          : `Extraction failed: ${err.message.slice(0, 80)}`;
        status.style.color = '#f87171';
        setTimeout(() => { status.textContent = ''; status.style.color = ''; }, 6000);
        return;
      }

      const updated = {
        ...file,
        structuredData,
        preview: Object.entries(structuredData)
          .filter(([k]) => k !== 'raw_text' && k !== 'raw_preview')
          .slice(0, 5)
          .map(([k, v]) => `${k}: ${JSON.stringify(v).slice(0, 80)}`)
          .join('\n'),
      };

      await saveIngestedFile(updated);

      status.textContent = `✓ Extracted ${file.filename}`;
      status.style.color = '#4ade80';
      setTimeout(() => { status.textContent = ''; status.style.color = ''; }, 3000);

      await this._renderFileList(container);
      await this._offerFieldImport(updated, container);
    },

    _hasFieldData(file) {
      const sd = file.structuredData;
      if (!sd || sd.parse_error) return false;
      return (
        (Array.isArray(sd.fields) && sd.fields.length > 0) ||
        (Array.isArray(sd.field_names) && sd.field_names.length > 0)
      );
    },
  };
}
