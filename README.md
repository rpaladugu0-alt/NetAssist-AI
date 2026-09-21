# NetAssist AI

NetAssist AI is an AI-assisted customer support application for **ClearWave Broadband**, a fictional regional internet service provider. It continues the Workshop 1 prototype: customers can ask certified support questions about Wi-Fi, modem restarts, billing information, equipment, and Charlotte-area outage status. Answers are grounded in mock knowledge-base articles. The app never connects to live customer accounts or real ISP APIs.

## Technologies used

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Data:** In-memory mock knowledge base, demo outage telemetry, and demo feedback storage

## Folder structure

```text
NetAssist-AI/
├── README.md
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── data/
│   │   ├── knowledge.js
│   │   └── outages.js
│   ├── routes/
│   │   ├── support.js
│   │   └── feedback.js
│   └── services/
│       └── supportEngine.js
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── api/client.js
        ├── components/
        └── utils/time.js
```

## Installation

Use Node.js 18 or later. From the project root:

```bash
npm install
```

## Production build and start

```bash
npm run build
npm start
```

The combined server listens on `process.env.PORT` when provided, or **http://localhost:3000** by default. It binds to `0.0.0.0` for cloud hosting, serves the production React build, and exposes the API under `/api`.

For local development, run the backend and Vite frontend separately:

```bash
npm run dev:backend

# In a second terminal
npm run dev:frontend
```

Vite proxies `/api` to the backend during development.

## API routes

Useful routes:

- `GET /api/health`
- `POST /api/support` — process a customer support question
- `GET /api/support/starters`
- `GET /api/support/knowledge`
- `GET /api/support/outages`
- `POST /api/feedback` — store thumbs-up / thumbs-down feedback and optional comments
- `GET /api/feedback` — inspect demo feedback records

## How to start the frontend

For frontend-only development:

```bash
npm run dev:frontend
```

## Localhost URLs

| Surface | URL |
| --- | --- |
| Customer support UI (production) | http://localhost:3000 |
| Customer support UI (Vite development) | http://localhost:5173 |
| Backend health check | http://localhost:3000/api/health |

## Main application features

- Broadband customer support chat interface
- Suggested starter questions
- Wi-Fi troubleshooting responses from certified mock articles
- Modem / gateway restart instructions
- Billing informational answers (no account lookup)
- Equipment informational answers (WavePulse gateway)
- Demo outage lookup for Charlotte-area regions, including Matthews
- Source titles shown with supported answers
- Thumbs-up and thumbs-down feedback with optional comments
- Backend feedback processing (`POST /api/feedback`)
- Clarification when the question is unclear
- Human support escalation for unsupported topics
- Human support escalation for account-specific requests such as refunds or billing changes
- Clear **Prototype / Demo Data** labeling on outage information
- Loading states, error handling, and empty-input validation
- Responsive, mobile-friendly layout

## Demo boundaries

- Outage status is simulated demonstration data, not a live network feed.
- Feedback is stored in memory on the local server and resets when the backend restarts.
- The assistant will not retrieve real customer bills, refunds, or account details.
