import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { createServer as createViteServer } from "vite";

import { PORT } from "./src/server/config";
import rootRouter from "./src/server/routes";
import { errorMiddleware } from "./src/server/middleware/error";
import { telemetryService } from "./src/server/services/TelemetryService";
import { anomalyService } from "./src/server/services/AnomalyService";
import { scannerService } from "./src/server/services/ScannerService";
import { rotatorService } from "./src/server/services/RotatorService";
import { swaggerRouter } from "./src/server/utils/swagger";
import { logger } from "./src/server/utils/logger";

const app = express();

app.set('trust proxy', 1);

// Enable secure HTTP headers using Helmet
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === "production" ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "blob:", "https:", "referrerPolicy"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "ws:", "wss:", "http:", "https:"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  } : false,
  crossOriginEmbedderPolicy: false,
}));

// Enable Rate Limiting (100 requests per 15 mins per IP) to prevent API abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req) => {
    return (req.headers['x-forwarded-for'] as string) || req.ip || 'unknown';
  },
  message: {
    error: "Too many requests from this IP, please try again later after 15 minutes."
  }
});

app.use("/api", apiLimiter);

// Enable Cross-Origin Resource Sharing (CORS) for external telemetry dashboard integration
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Enable generous limits for large telemetry payload configurations & machine manuals (RAG)
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

// 📖 Mount Automatically Generated OpenAPI / Swagger Documentation
app.use(swaggerRouter);

// 📡 Mount Root express sub-routers & healthchecks
app.get("/api/metrics", (req, res) => {
  res.json(telemetryService.getMetricsReporting());
});

// Standard Prometheus metrics endpoint
app.get("/metrics", (req, res) => {
  const data = telemetryService.getMetricsReporting();
  
  const formatted = [
    `# HELP pulseguard_uptime_seconds PulseGuard server uptime in seconds`,
    `# TYPE pulseguard_uptime_seconds gauge`,
    `pulseguard_uptime_seconds ${Math.floor(data.uptime)}`,
    ``,
    `# HELP pulseguard_telemetry_packets_processed_total Total number of sensor packets processed`,
    `# TYPE pulseguard_telemetry_packets_processed_total counter`,
    `pulseguard_telemetry_packets_processed_total ${data.metrics.totalTelemetryPacketsProcessed}`,
    ``,
    `# HELP pulseguard_demo_page_views_total Total number of demo page views`,
    `# TYPE pulseguard_demo_page_views_total counter`,
    `pulseguard_demo_page_views_total ${data.metrics.totalDemoPageViews}`,
    ``,
    `# HELP pulseguard_active_subscribed_teams Number of active subscribed teams`,
    `# TYPE pulseguard_active_subscribed_teams gauge`,
    `pulseguard_active_subscribed_teams ${data.metrics.activeSubscribedTeams}`,
    ``,
    `# HELP pulseguard_cumulative_alerts_triggered Total cumulative alerts triggered including historic baseline`,
    `# TYPE pulseguard_cumulative_alerts_triggered counter`,
    `pulseguard_cumulative_alerts_triggered ${data.metrics.cumulativeAlertsTriggered}`,
    ``,
    `# HELP pulseguard_detection_precision Detection precision rate`,
    `# TYPE pulseguard_detection_precision gauge`,
    `pulseguard_detection_precision ${data.metrics.detectionPrecision}`,
    ``,
    `# HELP pulseguard_false_alarm_rate False alarm rate`,
    `# TYPE pulseguard_false_alarm_rate gauge`,
    `pulseguard_false_alarm_rate ${data.metrics.falseAlarmRate}`
  ].join("\n");

  res.setHeader("Content-Type", "text/plain; version=0.0.4; charset=utf-8");
  res.status(200).send(formatted);
});

app.use(rootRouter);

// 🚀 Initialize and trigger underlying telemetry ingestion loops
telemetryService.start();

// Serve compiled static files in production or run Vite Dev middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    logger.info("⚡ PULSEGUARD CORE: Injecting Vite Development HMR middleware...");
    const vite = await createViteServer({
      root: path.join(process.cwd(), "packages/frontend"),
      configFile: path.join(process.cwd(), "packages/frontend/vite.config.ts"),
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    logger.info("📦 PULSEGUARD CORE: Serving production web build static files...");
    const distPath = path.join(process.cwd(), "dist");
    const indexPath = path.join(distPath, "index.html");
    
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      if (!fs.existsSync(indexPath)) {
        res.status(200).send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>PulseGuard // Industrial Monitoring Offline Fallback</title>
              <meta charset="utf-8">
              <style>
                body {
                  background-color: #0f172a;
                  color: #e2e8f0;
                  font-family: 'JetBrains Mono', monospace;
                  padding: 40px;
                  line-height: 1.6;
                }
                .container {
                  max-width: 800px;
                  margin: 60px auto;
                  border: 1px solid rgba(34, 211, 238, 0.2);
                  background-color: #0c0e14;
                  padding: 40px;
                  border-radius: 8px;
                  box-shadow: 0 4px 24px rgba(0,0,0,0.7);
                }
                h1 {
                  color: #22d3ee;
                  border-bottom: 1px solid rgba(34, 211, 238, 0.2);
                  padding-bottom: 15px;
                  font-size: 24px;
                  margin-top: 0;
                }
                pre {
                  background-color: #020617;
                  color: #22d3ee;
                  padding: 15px;
                  border-radius: 6px;
                  overflow-x: auto;
                  border: 1px solid rgba(34, 211, 238, 0.15);
                  font-size: 13px;
                }
                .section-title {
                  color: #22d3ee;
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
                <h1>🏭 PulseGuard Industrial IoT Platform</h1>
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
    logger.info(`🌌 PULSEGUARD: Full-stack Industrial IoT Platform operational at http://0.0.0.0:${PORT}`);
  });

  // --- Graceful Shutdown Handler ---
  const handleShutdown = (signal: string) => {
    logger.info(`🛑 Received ${signal}. Shutting down PulseGuard Platform gracefully...`);
    
    // Shut down background services
    anomalyService.shutdown();
    scannerService.shutdown();
    rotatorService.shutdown();

    server.close(() => {
      logger.info("🔌 Server closed. Exiting process.");
      process.exit(0);
    });

    // Force shutdown if taking too long
    setTimeout(() => {
      logger.error("⚠️ Forcefully shutting down due to timeout.");
      process.exit(1);
    }, 5000);
  };

  process.on("SIGINT", () => handleShutdown("SIGINT"));
  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
}

startServer();
