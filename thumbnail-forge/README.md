# Thumbnail Forge 🎬

> AI-powered YouTube thumbnail generator using Claude API and HTML5 Canvas

![Node](https://img.shields.io/badge/node-18%2B-green)
![React](https://img.shields.io/badge/react-18-blue)
![Claude](https://img.shields.io/badge/claude-sonnet--4-purple)

---

## What It Does

Thumbnail Forge lets YouTube creators generate professional, click-optimized thumbnails in seconds.

- **Live Canvas Rendering** — 1280×720px preview renders on every keystroke
- **AI Optimization** — Claude API generates 3 title variants with psychological hooks
- **6 Styles × 6 Moods × 4 Layouts** — hundreds of design combinations
- **One-click PNG export** — download YouTube-ready thumbnail instantly

---

## Project Structure

```
thumbnail-forge/
├── client/                  # React frontend
│   ├── components/
│   │   ├── Header.jsx       # Sticky nav bar
│   │   ├── Sidebar.jsx      # 3-tab control panel
│   │   ├── ThumbnailCanvas.jsx  # HTML5 Canvas renderer
│   │   └── PreviewPanel.jsx # Right-side preview + specs
│   ├── hooks/
│   │   ├── useThumbnail.js  # All form state + thumbnailData
│   │   ├── useAI.js         # Claude API calls + loading state
│   │   └── useHistory.js    # localStorage session history
│   ├── utils/
│   │   ├── constants.js     # STYLES, MOODS, LAYOUTS, etc.
│   │   ├── canvasUtils.js   # drawThumbnail(), downloadCanvasAsPng()
│   │   └── api.js           # fetchSuggestions(), fetchHealth()
│   ├── App.jsx              # Root component, wires everything
│   └── index.js             # ReactDOM entry point
│
├── server/                  # Express backend
│   ├── routes/
│   │   ├── thumbnail.js     # POST /api/thumbnail/suggest
│   │   └── health.js        # GET /api/health
│   ├── services/
│   │   ├── claudeService.js # Anthropic API integration
│   │   └── constants.js     # Shared style/mood data
│   ├── middleware/
│   │   ├── rateLimiter.js   # 30 req / 15 min per IP
│   │   ├── validateRequest.js  # Input validation
│   │   ├── errorHandler.js  # Global error handling
│   │   └── validateEnv.js   # Startup env check
│   └── server.js            # Express app + startup
│
├── docs/
│   ├── API.md               # REST API reference
│   └── ARCHITECTURE.md      # System design notes
│
├── .env.example             # Environment variable template
├── .gitignore
├── package.json             # Root scripts + server deps
└── README.md
```

---

## Quick Start

### 1. Clone & install

```bash
git clone https://github.com/yourname/thumbnail-forge.git
cd thumbnail-forge
npm run install:all
```

### 2. Configure environment

```bash
cp .env.example .env
```

Open `.env` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get a key at [console.anthropic.com](https://console.anthropic.com).

### 3. Run in development

```bash
npm run dev
```

This starts both:
- **Express server** on `http://localhost:5000`
- **React dev server** on `http://localhost:3000`

### 4. Build for production

```bash
npm run build    # builds client/build/
npm start        # serves from Express
```

---

## API Reference

### `POST /api/thumbnail/suggest`

Generate 3 AI-optimized thumbnail title variants.

**Request body:**
```json
{
  "title": "I Quit My Job After This",
  "channelName": "TechWithMark",
  "style": "cinematic",
  "mood": "dramatic",
  "subtitle": "optional hint"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "variants": [
      {
        "title": "I QUIT EVERYTHING (HERE'S WHY)",
        "subtitle": "The decision that changed my life",
        "hook": "Creates curiosity and fear of missing out",
        "tip": "Use the Dramatic mood for maximum contrast"
      }
    ],
    "colorStrategy": "Dark purple-to-black gradient signals premium content",
    "textTip": "Large font + single accent underline draws the eye immediately"
  }
}
```

**Valid style IDs:** `cinematic`, `bold_text`, `tutorial`, `reaction`, `vlog`, `gaming`

**Valid mood IDs:** `energetic`, `professional`, `dramatic`, `warm`, `mysterious`, `playful`

---

### `GET /api/health`

```json
{ "status": "ok", "uptime": 120, "model": "claude-sonnet-4-20250514" }
```

---

## Canvas Rendering Layers

The thumbnail is drawn in 12 sequential layers:

| # | Layer | Description |
|---|-------|-------------|
| 1 | Background gradient | LinearGradient using mood bg1→bg2 |
| 2 | Layout overlay | Split panel or bottom bar effect |
| 3 | Diagonal slash | Accent-tinted polygon at 12% opacity |
| 4 | Radial glow | Focal point depth effect |
| 5 | Grid texture | 40px grid at 3% white opacity |
| 6 | Left accent bar | 8px solid accent strip |
| 7 | Style badge | Rounded label in top-left |
| 8 | Title + shadow | Auto word-wrap, max 4 lines |
| 9 | Accent underline | 5px rect under last title line |
| 10 | Subtitle | 65% opacity supporting text |
| 11 | Stat watermark | Large background number |
| 12 | Channel name | Accent-colored @handle |

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ANTHROPIC_API_KEY` | ✅ Yes | — | Your Anthropic API key |
| `PORT` | No | `5000` | Express server port |
| `NODE_ENV` | No | `development` | Environment mode |
| `CLAUDE_MODEL` | No | `claude-sonnet-4-20250514` | Claude model |
| `RATE_LIMIT_MAX` | No | `30` | Max requests per 15 min |
| `CORS_ORIGIN` | No | `http://localhost:3000` | Allowed frontend origin |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, HTML5 Canvas API, CSS-in-JS |
| Backend | Node.js 18, Express 4 |
| AI | Anthropic Claude API (claude-sonnet-4) |
| Security | Helmet, CORS, express-rate-limit |

---

## License

MIT
