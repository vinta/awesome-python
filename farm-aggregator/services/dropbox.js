import { Dropbox } from 'dropbox';
import { config } from '../config.js';

let _dbx = null;

function dbx() {
  if (!_dbx) {
    _dbx = new Dropbox({
      clientId:     config.dropbox.appKey,
      clientSecret: config.dropbox.appSecret,
      refreshToken: config.dropbox.refreshToken,
    });
  }
  return _dbx;
}

export async function listNewFiles(folderPath, since) {
  const res = await dbx().filesListFolder({ path: folderPath, recursive: false });
  const entries = res.result.entries.filter(
    (e) => e['.tag'] === 'file' && (!since || new Date(e.client_modified) > new Date(since))
  );
  return entries;
}

export async function downloadText(path) {
  const res = await dbx().filesDownload({ path });
  const buf = await res.result.fileBinary;
  return Buffer.from(buf).toString('utf-8');
}

export async function uploadSummary(filename, content) {
  const path = `${config.dropbox.paths.outbox}/${filename}`;
  await dbx().filesUpload({
    path,
    contents: content,
    mode: { '.tag': 'overwrite' },
    autorename: false,
  });
  return path;
}

export async function readLatestSummaries(maxFiles = 5) {
  try {
    const res = await dbx().filesListFolder({ path: config.dropbox.paths.outbox, recursive: false });
    const files = res.result.entries
      .filter((e) => e['.tag'] === 'file' && e.name.endsWith('.txt'))
      .sort((a, b) => new Date(b.client_modified) - new Date(a.client_modified))
      .slice(0, maxFiles);

    const texts = await Promise.all(files.map(async (f) => {
      try { return { name: f.name, text: await downloadText(f.path_lower) }; }
      catch { return null; }
    }));
    return texts.filter(Boolean);
  } catch {
    return [];
  }
}

export async function readFolderFiles(folderPath, maxFiles = 10) {
  try {
    const res = await dbx().filesListFolder({ path: folderPath, recursive: false });
    const files = res.result.entries
      .filter((e) => e['.tag'] === 'file')
      .sort((a, b) => new Date(b.client_modified) - new Date(a.client_modified))
      .slice(0, maxFiles);

    const texts = await Promise.all(files.map(async (f) => {
      try { return { name: f.name, text: await downloadText(f.path_lower) }; }
      catch { return null; }
    }));
    return texts.filter(Boolean);
  } catch {
    return [];
  }
}
