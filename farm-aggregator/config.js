import 'dotenv/config';

export const config = {
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: 'claude-haiku-4-5-20251001',
    modelDeep: 'claude-sonnet-4-6',
  },
  agrefine: {
    url: process.env.AGREFINE_API_URL ?? 'https://ag-refine.onrender.com/api',
    apiKey: process.env.AGREFINE_API_KEY ?? '',
  },
  dropbox: {
    appKey: process.env.DROPBOX_APP_KEY,
    appSecret: process.env.DROPBOX_APP_SECRET,
    refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
    paths: {
      inbox:     process.env.DROPBOX_INBOX_PATH     ?? '/Farm/Inbox',
      outbox:    process.env.DROPBOX_OUTBOX_PATH    ?? '/Farm/Summaries',
      dairycomp: process.env.DROPBOX_DAIRYCOMP_PATH ?? '/Farm/DairyComp',
      feedlync:  process.env.DROPBOX_FEEDLYNC_PATH  ?? '/Farm/FeedLync',
    },
  },
  whatsapp: {
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN ?? '',
    phoneId:     process.env.WHATSAPP_PHONE_ID     ?? '',
    recipient:   process.env.WHATSAPP_RECIPIENT    ?? '',
    enabled: !!(process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_ID),
  },
  tomtom: {
    apiKey: process.env.TOMTOM_API_KEY ?? '',
  },
  server: {
    port: parseInt(process.env.WEBHOOK_PORT ?? '3001', 10),
  },
  schedule: {
    pulse:  process.env.PULSE_SCHEDULE  ?? '0 * * * *',
    daily:  process.env.DAILY_SCHEDULE  ?? '0 6 * * *',
    weekly: process.env.WEEKLY_SCHEDULE ?? '0 6 * * 1',
  },
};
