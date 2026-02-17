# Architecture Notes

## System Overview

```
Browser (React)
     │
     ├── useThumbnail()      ← form state, thumbnailData
     ├── useAI()             ← API calls, loading/error
     ├── useHistory()        ← localStorage persistence
     │
     ├── ThumbnailCanvas     ← HTML5 Canvas rendering
     ├── Sidebar             ← 3-tab control panel
     └── PreviewPanel        ← live preview + download
          │
          │  POST /api/thumbnail/suggest
          ▼
     Express Server
          │
          ├── rateLimiter    ← 30 req/15min per IP
          ├── validateRequest← input sanitization
          │
          └── claudeService  ── HTTPS ──► Anthropic API
                                          (claude-sonnet-4)
```

---

## Key Design Decisions

### Canvas over SVG
HTML5 Canvas was chosen over SVG because:
- Pixel-perfect gradient rendering
- `toDataURL()` exports a real PNG at full resolution
- No DOM overhead for complex layered visuals

### Server-side API calls
The Claude API key is kept on the server. The browser never sees it.
Client calls `POST /api/thumbnail/suggest` → server calls Anthropic.

### Structured JSON prompting
The Claude prompt explicitly requires a JSON-only response with no markdown fences.
This makes `JSON.parse()` reliable and avoids brittle regex extraction.

### Custom hooks separation
- `useThumbnail` — owns all form state. No API knowledge.
- `useAI` — owns all Claude API state. No UI knowledge.
- `useHistory` — owns localStorage. Completely independent.

App.jsx composes them together, keeping each hook testable in isolation.

---

## Data Flow

```
User types title
      │
      ▼
useThumbnail.thumbnailData (memo)
      │
      ├──► ThumbnailCanvas (useEffect → drawThumbnail)
      │         └── canvasUtils.drawThumbnail(ctx, W, H, data)
      │
      └──► Sidebar shows current values

User clicks Generate
      │
      ▼
useAI.generate(payload)
      │
      ▼
fetch POST /api/thumbnail/suggest
      │
      ▼
claudeService.generateSuggestions()
      │
      ▼
Anthropic Messages API
      │
      ▼
JSON parsed → setSuggestions()
      │
      ▼
AISuggestionsPanel renders variants

User clicks a variant
      │
      ▼
applyVariant(v) → setTitle + setSubtitle
      │
      ▼
thumbnailData memo updates → canvas redraws
```

---

## Canvas Layer Order

All drawing is in `canvasUtils.drawThumbnail()`:

1. `fillRect` — background gradient
2. Conditional layout overlays (split/bottom)
3. Diagonal slash polygon
4. Radial glow `createRadialGradient`
5. Grid texture lines
6. Left accent bar
7. Style badge `roundRect`
8. Title text with drop shadow + word wrap
9. Accent underline `fillRect`
10. Subtitle text
11. Background watermark number
12. Channel name + corner dots
