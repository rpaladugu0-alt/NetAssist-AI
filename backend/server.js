import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import feedbackRouter from "./routes/feedback.js";
import supportRouter from "./routes/support.js";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
const frontendDistPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../frontend/dist");
const supportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});
const feedbackLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many feedback submissions. Please try again later." },
});

app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"], credentials: false }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    service: "NetAssist AI",
    company: "ClearWave Broadband",
    status: "ok",
    demo: true,
  });
});

app.use("/api/support", supportLimiter, supportRouter);
app.use("/api/feedback", feedbackLimiter, feedbackRouter);

app.use(express.static(frontendDistPath));

app.get("*", (req, res, next) => {
  if (req.path === "/api" || req.path.startsWith("/api/")) {
    return next();
  }

  if (req.accepts("html")) {
    return res.sendFile(path.join(frontendDistPath, "index.html"));
  }

  return next();
});

app.use((req, res) => {
  res.status(404).json({ error: `No route found for ${req.method} ${req.path}` });
});

app.use((err, _req, res, _next) => {
  console.error("Unhandled server error");
  res.status(500).json({ error: "An unexpected server error occurred. Please try again." });
});

app.listen(PORT, HOST, () => {
  console.log(`NetAssist AI server listening on http://${HOST}:${PORT}`);
});
