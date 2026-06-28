import { runPulse } from '../jobs/pulse.js';
runPulse().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
