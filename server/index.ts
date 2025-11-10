// server/index.ts
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, log } from "./vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// === Raw body for webhooks ===
declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: false }));

// === Request logging (only for /api routes) ===
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson: any, ...args: any[]) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

// === Register API routes ===
let server: any;

(async () => {
  server = await registerRoutes(app);

  // === Global error handler ===
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // === DEVELOPMENT: Vite HMR ===
  if (app.get("env") === "development") {
    await setupVite(app, server);
  }

  // === PRODUCTION: Serve built React app ===
  else {
    const publicPath = path.join(__dirname, "..", "..", "dist", "public");

    // 1. Serve static files (CSS, JS, images)
    app.use(express.static(publicPath));

    // 2. SPA Fallback — MUST BE LAST
    app.get("*", (req, res) => {
      // Skip API routes
      if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "API route not found" });
      }

      // Serve index.html for ALL client routes: /admin, /about, etc.
      const indexPath = path.join(publicPath, "index.html");
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error("Failed to send index.html:", err);
          res.status(500).send("Internal Server Error");
        }
      });
    });
  }

  // === Start server: only in dev or local prod (NOT on Vercel) ===
  if (!process.env.VERCEL) {
    const port = parseInt(process.env.PORT || "5000", 10);
    const isMacOS = process.platform === "darwin";
    const host = isMacOS ? "127.0.0.1" : "0.0.0.0";

    server.listen(
      {
        port,
        host,
        ...(isMacOS ? {} : { reusePort: true }),
      },
      () => {
        log(`serving on http://${host}:${port}`);
      }
    );
  }
})();

// === Export for Vercel Serverless Function ===
export default app;