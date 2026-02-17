// ─────────────────────────────────────────────────────────────
// server/services/claudeService.js — Anthropic API integration
// ─────────────────────────────────────────────────────────────

const fetch = (...args) =>
  import("node-fetch").then(({ default: f }) => f(...args));

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

/**
 * Build the optimized prompt for thumbnail title generation
 */
function buildPrompt({ title, channelName, style, mood, subtitle }) {
  return `You are an expert YouTube thumbnail strategist with deep knowledge of what drives clicks.

Analyze this thumbnail request and generate 3 highly optimized title variants:

Title: "${title}"
Channel: "${channelName}"
Style: ${style}
Mood: ${mood}
${subtitle ? `Subtitle hint: "${subtitle}"` : ""}

Rules for variants:
- Maximum 6 words, ALL CAPS
- Must create curiosity, urgency, or shock value
- Must be scroll-stopping and authentic
- Avoid misleading clickbait

Respond ONLY with valid JSON (no markdown, no code fences):
{
  "variants": [
    {
      "title": "SHORT PUNCHY TITLE",
      "subtitle": "one supporting line",
      "hook": "why this works psychologically",
      "tip": "specific design tip for this title"
    }
  ],
  "colorStrategy": "one sentence on color approach for this mood",
  "textTip": "one sentence typography advice"
}`;
}

/**
 * Call Anthropic Messages API and parse response
 * @param {Object} params - { title, channelName, style, mood, subtitle }
 * @returns {Promise<Object>} parsed suggestions
 */
async function generateSuggestions(params) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.CLAUDE_MODEL || "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: buildPrompt(params),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Claude API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const rawText = data.content?.[0]?.text || "{}";

  // Strip any accidental markdown fences
  const cleaned = rawText.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Failed to parse Claude response as JSON");
  }

  // Validate expected shape
  if (!Array.isArray(parsed.variants)) {
    throw new Error("Unexpected response shape from Claude");
  }

  return parsed;
}

module.exports = { generateSuggestions };
