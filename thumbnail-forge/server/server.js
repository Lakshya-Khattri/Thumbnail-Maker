// ─────────────────────────────────────────────────────────────
// server/server.js — Express entry point
// ─────────────────────────────────────────────────────────────

require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { rateLimiter } = require("./middleware/rateLimiter");
const { errorHandler } = require("./middleware/errorHandler");
const { validateEnv } = require("./middleware/validateEnv");
const thumbnailRoutes = require("./routes/thumbnail");
const healthRoutes = require("./routes/health");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Validate environment on startup ──────────────────────────
validateEnv();

// ── Security & utility middleware ─────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "10kb" }));

// ── Rate limiting ─────────────────────────────────────────────
app.use("/api/", rateLimiter);

// ── Routes ────────────────────────────────────────────────────
app.use("/api/health", healthRoutes);
app.use("/api/thumbnail", thumbnailRoutes);

// ── 404 handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Global error handler ──────────────────────────────────────
app.use(errorHandler);

// ── Start server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Thumbnail Forge server running`);
  console.log(`   Port    : ${PORT}`);
  console.log(`   Env     : ${process.env.NODE_ENV || "development"}`);
  console.log(`   Model   : ${process.env.CLAUDE_MODEL}\n`);
});

module.exports = app;
