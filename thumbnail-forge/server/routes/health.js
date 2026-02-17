// ─────────────────────────────────────────────────────────────
// server/routes/health.js — Server health check
// ─────────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
    model: process.env.CLAUDE_MODEL || "claude-sonnet-4-20250514",
  });
});

module.exports = router;
