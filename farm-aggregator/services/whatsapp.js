import { config } from '../config.js';

const BASE = 'https://graph.facebook.com/v19.0';

export async function sendMessage(text, to = config.whatsapp.recipient) {
  if (!config.whatsapp.enabled) {
    console.log('[WhatsApp] disabled — message would have been:', text.slice(0, 120));
    return;
  }

  const res = await fetch(`${BASE}/${config.whatsapp.phoneId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.whatsapp.accessToken}`,
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text.slice(0, 4096) },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`WhatsApp ${res.status}: ${err}`);
  }
  return res.json();
}
