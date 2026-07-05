# Contributing to Astrova 🛰️

First off, thank you for considering contributing to the **Astrova SDR Satellite Telemetry Station**! This guide outlines how to get set up locally, code standards, and the process for submitting contributions.

---

## 🛠️ Local Development Setup

To run and contribute to the system locally:

### Prerequisites
* **Node.js**: `v18+` or higher (compatible with standard ESM/CJS runtime bundles)
* **Python**: `3.10+` (if running/debugging the algorithmic anomaly detector locally)

### Steps
1. **Clone the repository** and navigate to the root directory.
2. **Install node dependencies**:
   ```bash
   npm install
   ```
3. **Set up local environment variables**:
   Create a `.env` file at the root using our template:
   ```bash
   cp .env.example .env
   ```
   Add a valid `GEMINI_API_KEY` in the newly created file to enable the fully automated Space Copilot.
4. **Boot Development Environment**:
   ```bash
   npm run dev
   ```
   The dev server binds to `http://localhost:3000`.

---

## 🏗️ Build & Production Deployment

To package the application for high-performance container environments:
* **Compile and Bundle**:
  ```bash
  npm run build
  ```
  This command builds the static client-side React code with Vite into `dist/`, and bundles the Node/Express backend into a single self-contained CommonJS module at `dist/server.cjs` via `esbuild`.
* **Launch Production Server**:
  ```bash
  npm run start
  ```

---

## 🌌 Core Technical Conventions

When modifying the codebase, please respect these strict design standards:

### 1. Algorithmic Parity (TypeScript vs. Python)
We maintain a strict 1-to-1 consistency between the Python telemetry model (`anomaly_detector.py`) and the Node event loop (`server.ts`):
* **Normal Bounds**: 
  * Temperature: `-25.0°C` to `75.0°C`
  * Battery Level: `10.0%` to `100.0%`
  * Signal Strength: `-100.0 dBm` to `-30.0 dBm`
  * Angular Velocity: `0.0 deg/s` to `12.5 deg/s`
* **Rolling Buffers**: Standard deviation metrics are calculated against a rolling window size of the last **30** telemetry ticks.
* **Vector Outliers**: Multi-variate anomalies are calculated using Euclidean distance offset from a dynamic running centroid.

### 2. Protected SDR/GNU Radio Ingestion
All hardware streaming endpoints require authorization using basic token matching:
* **Endpoints**: `POST /api/gnuradio/signal` and `POST /api/gnuradio/inject-sim`
* **Demo Token**: `ASTROVA-SDR-DEMO-KEY-2026`
* All REST requests must carry: `Authorization: Bearer ASTROVA-SDR-DEMO-KEY-2026` or the API will reject with 401/403 errors.

### 3. Visual Identity
* We use **Tailwind CSS** for styling.
* Font pairings utilize **Inter** for standard panels, paired with **JetBrains Mono** or **Fira Code** for charts, signal logs, and terminal elements.
* Visual accent indicators (alerts, tour indicators, overlay components) must remain consistent with the **slate-colored tactical sci-fi flight control theme**.

---

## 🤝 Contribution Workflow

1. **Check open issues** or create one to describe the bug or feature you are addressing.
2. **Fork/Branch off master**:
   ```bash
   git checkout -b feature/orbital-xyz
   ```
3. **Format & Lint**: Ensure TypeScript compiles perfectly and files comply with static rules.
   ```bash
   npm run lint
   ```
4. **Submit a Pull Request** with clean commit messages and a clear summary of your visual or architectural changes.
