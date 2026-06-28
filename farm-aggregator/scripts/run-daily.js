import { runDaily } from '../jobs/digest.js';
runDaily().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
