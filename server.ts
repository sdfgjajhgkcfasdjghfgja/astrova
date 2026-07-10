import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

import { PORT } from "./src/server/config";
import rootRouter from "./src/server/routes";
import { errorMiddleware } from "./src/server/middleware/error";
import { telemetryService } from "./src/server/services/TelemetryService";
import { anomalyService } from "./src/server/services/AnomalyService";
import { scannerService } from "./src/server/services/ScannerService";
import { rotatorService } from "./src/server/services/RotatorService";

const app = express();

// Enable generous limits for large telemetry payload configurations & satellite manuals (RAG)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// --- Automatic NODE_ENV Defaulting ---
if (!process.env.NODE_ENV) {
  try {
    const isBundled = typeof __filename !== "undefined" && 
      (__filename.includes("dist") || __filename.includes("server.cjs"));
    if (isBundled) {
      process.env.NODE_ENV = "production";
    }
  } catch (e) {
    // Ignore
  }
}

// 📡 Mount Root express sub-routers & healthchecks
app.get("/api/metrics", (req, res) => {
  res.json(telemetryService.getMetricsReporting());
});

app.use(rootRouter);

// 🚀 Initialize and trigger underlying telemetry ingestion loops
telemetryService.start();

// Serve compiled static files in production or run Vite Dev middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("⚡ ASTROVA CORE: Injecting Vite Development HMR middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("📦 ASTROVA CORE: Serving production web build static files...");
    const distPath = path.join(process.cwd(), "dist");
    const indexPath = path.join(distPath, "index.html");
    
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      if (!fs.existsSync(indexPath)) {
        res.status(200).send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Astrova // Ground Station Offline Fallback</title>
              <meta charset="utf-8">
              <style>
                body {
                  background-color: #050608;
                  color: #e2e8f0;
                  font-family: 'JetBrains Mono', monospace;
                  padding: 40px;
                  line-height: 1.6;
                }
                .container {
                  max-width: 800px;
                  margin: 60px auto;
                  border: 1px solid rgba(16, 185, 129, 0.2);
                  background-color: #0b0d12;
                  padding: 40px;
                  border-radius: 8px;
                  box-shadow: 0 4px 24px rgba(0,0,0,0.7);
                }
                h1 {
                  color: #10b981;
                  border-bottom: 1px solid rgba(16, 185, 129, 0.2);
                  padding-bottom: 15px;
                  font-size: 24px;
                  margin-top: 0;
                }
                pre {
                  background-color: #020617;
                  color: #34d399;
                  padding: 15px;
                  border-radius: 6px;
                  overflow-x: auto;
                  border: 1px solid rgba(16, 185, 129, 0.15);
                  font-size: 13px;
                }
                .section-title {
                  color: #38bdf8;
                  font-weight: bold;
                  margin-top: 25px;
                  margin-bottom: 5px;
                  font-size: 14px;
                  text-transform: uppercase;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>🛰️ Astrova Yer İstasyonu / Ground Station</h1>
                <p><strong>Backend API Server running successfully on port ${PORT}!</strong></p>
                <p>But the frontend static build is not compiled yet.</p>
                <div class="section-title">🛠️ Compilation Commands:</div>
                <pre>npm run clean && npm run build && npm run start</pre>
              </div>
            </body>
          </html>
        `);
      } else {
        res.sendFile(indexPath);
      }
    });
  }

  // Bind error handling middleware as the final catchment step
  app.use(errorMiddleware);

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n🌌 ASTROVA: Full-stack Space Ground Station operational at http://0.0.0.0:${PORT}\n`);
  });

  // --- Graceful Shutdown Handler ---
  const handleShutdown = (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Shutting down Astrova Ground Station gracefully...`);
    
    // Shut down background services
    anomalyService.shutdown();
    scannerService.shutdown();
    rotatorService.shutdown();

    server.close(() => {
      console.log("🔌 Server closed. Exiting process.");
      process.exit(0);
    });

    // Force shutdown if taking too long
    setTimeout(() => {
      console.error("⚠️ Forcefully shutting down due to timeout.");
      process.exit(1);
    }, 5000);
  };

  process.on("SIGINT", () => handleShutdown("SIGINT"));
  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
}

startServer();
