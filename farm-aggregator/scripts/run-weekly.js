import { runWeekly } from '../jobs/digest.js';
runWeekly().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
