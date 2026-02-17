# API Reference

Base URL: `http://localhost:5000/api`

---

## Endpoints

### POST `/thumbnail/suggest`

Generate AI-optimized title variants for a thumbnail.

#### Request

```http
POST /api/thumbnail/suggest
Content-Type: application/json
```

```json
{
  "title": "I Built a $100K Business in 30 Days",
  "channelName": "MyChannel",
  "style": "cinematic",
  "mood": "dramatic",
  "subtitle": "optional supporting hint"
}
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | ✅ | Max 200 chars |
| `channelName` | string | No | Defaults to "YouTube Channel" |
| `style` | string | No | See valid values below |
| `mood` | string | No | See valid values below |
| `subtitle` | string | No | Hint for AI context |

**Valid style values:** `cinematic`, `bold_text`, `tutorial`, `reaction`, `vlog`, `gaming`

**Valid mood values:** `energetic`, `professional`, `dramatic`, `warm`, `mysterious`, `playful`

#### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "variants": [
      {
        "title": "I MADE $100K IN 30 DAYS",
        "subtitle": "The exact blueprint nobody shares",
        "hook": "Creates FOMO and implies exclusive information",
        "tip": "Pair with Dramatic mood and Bold Text style for maximum impact"
      },
      {
        "title": "FROM ZERO TO $100K FAST",
        "subtitle": "Step-by-step breakdown inside",
        "hook": "Journey framing triggers curiosity about the process",
        "tip": "Use large font size with Center layout to dominate the frame"
      },
      {
        "title": "THIS BUSINESS MADE ME RICH",
        "subtitle": "30 days, real results",
        "hook": "Personal claim creates relatability and aspiration",
        "tip": "Bottom Bar layout pairs well with a reaction-style face crop"
      }
    ],
    "colorStrategy": "Deep purple to black gradient signals premium authority content",
    "textTip": "Georgia serif at large size with a single accent underline commands attention"
  }
}
```

#### Error responses

| Status | Meaning |
|--------|---------|
| `400` | Validation failed — check `details` array |
| `429` | Rate limit exceeded — wait 15 minutes |
| `502` | Claude API error or parse failure |
| `500` | Internal server error |

---

### GET `/thumbnail/styles`

Returns all available styles, moods, font sizes, and layouts.

#### Response `200 OK`

```json
{
  "success": true,
  "data": {
    "STYLES": [...],
    "MOODS": [...],
    "FONT_SIZES": [...],
    "LAYOUTS": [...]
  }
}
```

---

### GET `/health`

Server health check.

#### Response `200 OK`

```json
{
  "status": "ok",
  "uptime": 3600,
  "timestamp": "2025-02-17T12:00:00.000Z",
  "version": "1.0.0",
  "model": "claude-sonnet-4-20250514"
}
```

---

## Rate Limiting

- **Window:** 15 minutes
- **Max requests:** 30 per IP (configurable via `RATE_LIMIT_MAX`)
- **Headers:** `RateLimit-Remaining`, `RateLimit-Reset`

When exceeded:
```json
{ "error": "Too many requests — please wait before generating again." }
```
