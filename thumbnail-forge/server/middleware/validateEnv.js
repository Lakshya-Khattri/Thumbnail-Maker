// ─────────────────────────────────────────────────────────────
// server/middleware/validateEnv.js
// ─────────────────────────────────────────────────────────────

function validateEnv() {
  const required = ["ANTHROPIC_API_KEY"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(`\n❌ Missing required environment variables: ${missing.join(", ")}`);
    console.error("   Copy .env.example to .env and fill in values.\n");
    process.exit(1);
  }

  // Set defaults
  process.env.CLAUDE_MODEL  = process.env.CLAUDE_MODEL  || "claude-sonnet-4-20250514";
  process.env.NODE_ENV      = process.env.NODE_ENV      || "development";
  process.env.CORS_ORIGIN   = process.env.CORS_ORIGIN   || "http://localhost:3000";
}

module.exports = { validateEnv };
