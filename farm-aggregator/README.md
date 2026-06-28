# Farm Aggregator

A lightweight Node.js service that runs on the farm server. It pulls data from AG-Refine and Dropbox, synthesises it with Claude Haiku, and pushes summaries back to Dropbox and WhatsApp on a schedule.

## Data flow

```
AG-Refine (Render) ─┐
DairyComp logs     ──┤  Dropbox  ──→  farm-aggregator  ──→  Haiku  ──→  Dropbox /Summaries
FeedLync files     ──┘                      │                              WhatsApp
                                            │
TomTom geofence webhooks  ────────────────→─┘
```

## Setup

### 1. Install Node.js 20+
Download from https://nodejs.org/

### 2. Clone the repo and install dependencies
```bat
cd farm-aggregator
npm install
```

### 3. Create your .env file
```bat
copy .env.example .env
notepad .env
```

Fill in:
- `ANTHROPIC_API_KEY` — your Anthropic key
- `DROPBOX_*` — see Dropbox section below
- `WHATSAPP_*` — optional, leave blank to skip

### 4. Dropbox OAuth setup

1. Go to https://www.dropbox.com/developers/apps and create an app
2. Set permissions: `files.content.read`, `files.content.write`
3. Generate an access token OR set up the refresh token flow
4. Copy App Key, App Secret, and Refresh Token into `.env`

### 5. Start the service
```bat
start.bat
```

Or to run as a Windows service (stays running after logout):
```bat
npm install -g node-windows
node install-service.js
```

## Schedules

| Job | Default | What it does |
|-----|---------|--------------|
| Pulse | Hourly | Quick snapshot — tickets, lab flags, ops |
| Daily | 06:00 | Full daily digest pushed to Dropbox + WhatsApp |
| Weekly | Mon 06:00 | Weekly summary (Sonnet, deeper analysis) |

Change schedules in `.env` using cron syntax.

## TomTom geofencing

1. In TomTom Geofencing API, create fences for each field boundary
2. Set webhook URL to `http://YOUR_SERVER_IP:3001/webhook/tomtom`
3. Entry/exit events are logged to Dropbox and sent to WhatsApp

## Manual triggers (testing)

```bash
curl -X POST http://localhost:3001/run/pulse
curl -X POST http://localhost:3001/run/daily
curl -X POST http://localhost:3001/run/weekly
```

## Planned integrations

- **iyohtah / nTELL AI** — herd health data once API access is confirmed
- **Daitrix** — AI camera feed events (scale automation, pen detection)
- **Oracle Cloud** — heavy data processing offload
