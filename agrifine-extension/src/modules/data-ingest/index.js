import { getIngestedFiles, saveIngestedFile, deleteIngestedFile } from '../../utils/storage.js';
import { callAnthropic } from '../../utils/api.js';

const SUPPORTED_TYPES = {
  'text/csv': 'CSV',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
  'application/vnd.ms-excel': 'Excel',
  'application/pdf': 'PDF',
};

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
            class="border-2 border-dashed border-agri-300 rounded-xl p-6 text-center cursor-pointer hover:border-agri-500 hover:bg-agri-50 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-agri-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="text-sm font-medium text-gray-600">Drop CSV, Excel, or PDF here</p>
            <p class="text-xs text-gray-400 mt-1">or click to select a file</p>
            <input id="file-input" type="file" accept=".csv,.xlsx,.xls,.pdf" class="hidden" />
          </div>
          <div id="ingest-status" class="text-xs text-center text-gray-400 mt-2 min-h-[1rem]"></div>
        </div>

        <!-- File list -->
        <div id="file-list" class="px-4 pb-4"></div>
      `;

      this._bindEvents(container);
      await this._renderFileList(container);
    },

    _bindEvents(container) {
      const dropZone = container.querySelector('#drop-zone');
      const fileInput = container.querySelector('#file-input');

      dropZone.addEventListener('click', () => fileInput.click());

      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('border-agri-600', 'bg-agri-50');
      });

      dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('border-agri-600', 'bg-agri-50');
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-agri-600', 'bg-agri-50');
        const file = e.dataTransfer.files[0];
        if (file) this._processFile(file, container);
      });

      fileInput.addEventListener('change', () => {
        if (fileInput.files[0]) this._processFile(fileInput.files[0], container);
      });
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

      status.textContent = `Parsing ${typeName}…`;
      let extractedText = '';

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

      status.textContent = 'Extracting structured data with AI…';
      let structuredData = null;

      try {
        const raw = await callAnthropic({
          system: 'You are an agricultural data analyst. Extract and return structured JSON from this document. Identify: operation type, field names, dates, quantities, equipment, crop types, financial figures, and any carbon or emissions data. Return only valid JSON.',
          userMessage: extractedText.slice(0, 6000),
          maxTokens: 1024,
        });
        structuredData = JSON.parse(raw);
      } catch (_) {
        structuredData = { raw_preview: extractedText.slice(0, 500), parse_error: 'AI extraction unavailable' };
      }

      const record = {
        id: `file_${Date.now()}`,
        filename: file.name,
        type: typeName,
        uploadedAt: new Date().toISOString(),
        structuredData,
        preview: Object.entries(structuredData ?? {})
          .filter(([k]) => k !== 'raw_preview')
          .slice(0, 5)
          .map(([k, v]) => `${k}: ${JSON.stringify(v).slice(0, 80)}`)
          .join('\n'),
      };

      await saveIngestedFile(record);
      status.textContent = 'File processed!';
      setTimeout(() => { status.textContent = ''; }, 2000);
      await this._renderFileList(container);
    },

    _parseCSV(file) {
      return new Promise((resolve, reject) => {
        // PapaParse is loaded dynamically to keep the background bundle lean
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
            const pdf = await pdfjsLib.getDocument({ data: e.target.result }).promise;
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

      listEl.innerHTML = files.map((f) => `
        <div class="agri-card" data-id="${f.id}">
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1">
              <span class="text-xs font-bold uppercase tracking-wide text-earth-600">${f.type}</span>
              <p class="text-sm font-semibold text-gray-800 leading-snug mt-0.5">${f.filename}</p>
              <p class="text-xs text-gray-400 mt-0.5">${new Date(f.uploadedAt).toLocaleDateString()}</p>
            </div>
            <button class="file-delete-btn text-gray-300 hover:text-red-400 transition flex-shrink-0" data-id="${f.id}" title="Remove">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          ${f.preview ? `<pre class="text-xs text-gray-500 mt-2 whitespace-pre-wrap bg-gray-50 rounded p-2 overflow-hidden max-h-20">${f.preview}</pre>` : ''}
        </div>
      `).join('');

      listEl.querySelectorAll('.file-delete-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
          await deleteIngestedFile(btn.dataset.id);
          await this._renderFileList(container);
        });
      });
    },
  };
}
