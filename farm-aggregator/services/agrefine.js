import { config } from '../config.js';

const BASE = config.agrefine.url;

function headers() {
  const h = { 'Content-Type': 'application/json' };
  if (config.agrefine.apiKey) h['Authorization'] = `Bearer ${config.agrefine.apiKey}`;
  return h;
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { headers: headers() });
  if (!res.ok) throw new Error(`AG-Refine ${res.status}: ${path}`);
  return res.json();
}

export async function fetchSnapshot() {
  const [fields, tickets, labSamples, harvestPlans, operations] = await Promise.allSettled([
    get('/fields/'),
    get('/scales/tickets/all'),
    get('/intelligence/lab-samples'),
    get('/harvest/plans'),
    get('/operations/'),
  ]);

  return {
    fields:        fields.status        === 'fulfilled' ? fields.value        : [],
    tickets:       tickets.status       === 'fulfilled' ? tickets.value       : [],
    labSamples:    labSamples.status    === 'fulfilled' ? labSamples.value    : [],
    harvestPlans:  harvestPlans.status  === 'fulfilled' ? harvestPlans.value  : [],
    operations:    operations.status    === 'fulfilled' ? operations.value    : [],
    fetchedAt: new Date().toISOString(),
  };
}

export function summariseSnapshot(snap) {
  const lines = [`AG-Refine snapshot (${snap.fetchedAt?.slice(0, 16)} UTC)`];

  if (snap.fields?.length) {
    lines.push(`\nFields (${snap.fields.length}):`);
    snap.fields.slice(0, 10).forEach((f) => {
      lines.push(`  • ${f.name} — ${f.acres ?? '?'} ac, ${f.soil_type ?? 'unknown soil'}`);
    });
  }

  if (snap.tickets?.length) {
    const recent = snap.tickets.slice(0, 5);
    lines.push(`\nRecent weigh tickets (${snap.tickets.length} total):`);
    recent.forEach((t) => {
      const dm = t.dm_pct != null ? ` DM ${t.dm_pct}%` : '';
      lines.push(`  • ${t.date?.slice(0, 10) ?? '?'} ${t.commodity ?? t.label ?? 'load'}: net ${t.net_weight ?? '?'} ${t.unit ?? 'lb'}${dm}`);
    });
  }

  if (snap.labSamples?.length) {
    const recent = snap.labSamples.slice(0, 3);
    lines.push(`\nRecent lab samples:`);
    recent.forEach((s) => {
      const parts = [];
      if (s.dm_pct  != null) parts.push(`DM ${s.dm_pct}%`);
      if (s.ndf_pct != null) parts.push(`NDF ${s.ndf_pct}%`);
      if (s.rfv     != null) parts.push(`RFV ${s.rfv}`);
      if (s.nel     != null) parts.push(`NEL ${s.nel}`);
      lines.push(`  • ${s.field_name ?? s.field_id ?? '?'} (${s.sample_date?.slice(0, 10) ?? '?'}): ${parts.join(', ')}`);
    });
  }

  if (snap.harvestPlans?.length) {
    lines.push(`\nHarvest plans: ${snap.harvestPlans.length} active`);
  }

  return lines.join('\n');
}
