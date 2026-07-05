# 🛰️ Astrova — Intelligent Ground Station & SDR Telemetry Suite

![Astrova Banner](./src/assets/images/astrova_banner_1782543879024.jpg)

> **Astrova is an AI-augmented, SDR-integrated ground station operations platform that monitors multi-variate satellite telemetry and decodes RF signatures in real-time to prevent critical spacecraft mission failures.**
>
> *Astrova; uydu operatörleri, akademik CubeSat ekipleri ve uzay meraklıları için gerçek zamanlı uydu telemetri anomali tespiti ve sivil RF spektrum analizi sunan akıllı bir yer istasyonu yazılımıdır.*

---

## ⚡ What Astrova Does (İlk Bakış / Quick View)

Astrova, geleneksel yer istasyonlarının aksine statik eşik değerleri yerine dinamik ve akıllı veri akış analizi yapar:

* **📊 Multi-Variate Anomaly Detection:** Sıcaklık, batarya, sinyal gücü gibi parametreleri 4 boyutlu bir durum vektöründe izler; **Z-Score** ve **Euclidean Centroid Clustered Score** ile mikro sapmaları anında yakalar.
* **📡 Live SDR Waterfall Stream:** Gerçek zamanlı GNU Radio ve RTL-SDR sinyal akışlarını simüle eder veya fiziksel donanımınızdan gelen verileri şelale (waterfall) spektrogramında gösterir.
* **🧠 Astrova Yerleşik DSP Dekoderi:** Anomali anında uydu telemetrisini saniyeler içinde yerel algoritmalarla yorumlayarak sivil araştırma/akademik raporlar oluşturur ve olası arıza sebeplerini tespit eder.
* **🌍 Orbital Trajectory Tracking:** SGP4 algoritması ve iki satırlı veri (TLE) seti ile uydu yörüngelerini dünya haritası üzerinde ve 3D gök kubbe radarı üzerinde canlandırır.

---

## 🚀 Local & Desktop Installation Guide

You can run Astrova in three different environments: **In-Browser Web Application**, **Native Desktop Application (Electron)**, or inside an **Isolated Docker Sandbox**.

### 📋 Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **Python 3** (Optional: for running the high-fidelity telemetry generator script. If Python is missing, a fallback Node.js simulator launches automatically).

---

### 💻 Option 1: Native Desktop Application (Electron)

Astrova is fully packaged as a high-fidelity desktop application with custom window styling, offline support, and low-latency internal process management.

#### 1. Install Dependencies
Before running or building, install the required node modules:
```bash
npm install
```

#### 2. Start Desktop in Development Mode
Launch the application inside an interactive, hot-reloading desktop window:
```bash
npm run electron:dev
```
*Behind the scenes, this starts both the telemetry ingestion Express server and the Vite web UI concurrently, waits for port `3000` to be ready, and opens the native Electron container.*

#### 3. Build & Package Desktop Executables
To bundle the desktop app into a standalone installer or portable binary (such as `.exe` on Windows, `.dmg` on macOS, or `.AppImage` on Linux) inside the `/dist-desktop` directory:
```bash
npm run electron:build
```
*(Alternatively, you can run `npm run electron:package` which executes the packaging sequence directly).*

---

### 🌐 Option 2: Running the Web Application Locally

To test the application locally inside your favorite web browser:

#### 1. Run Local Demo
```bash
npm install
npm run demo
```
This boots up the local server and automatically opens `http://localhost:3000` in your default browser.

#### 2. Standard Web Development
If you prefer to start the development server without automatic browser triggers:
```bash
npm run dev
```

---

### 🐳 Option 3: Isolated Docker Sandbox
For complete container isolation including both Python telemetry engines and the Express server:
```bash
docker compose up --build
```
Once the container starts, open `http://localhost:3000` in your browser.

---

## 🏗️ System Architecture & Mechanics

Astrova uses a multi-tier pipeline designed for real-time responsiveness and stability:

1. **Telemetry Stream Engine (`telemetry_generator.py` / `server.ts`):** Implements a LEO (Low Earth Orbit) satellite simulator simulating thermal orbital cycles, solar panel configurations, battery depth-of-discharge, and signal-to-noise ratio fluctuation.
2. **Express Ingestion Broker (`server.ts`):** Processes incoming signal buffers, executes Euclidean Centroid Clustered analysis, and streams real-time updates via **Server-Sent Events (SSE)** to the frontend with minimal overhead.
3. **Interactive React Interface:** Renders real-time pixel-perfect SVG widgets, a dynamic 3D celestial sky map, customizable threat thresholds, and an interactive local DSP decoder interface.

---

## 📡 Local DSP Offline Processing & SDR Ingestion

Astrova runs entirely local (offline) using deterministic, high-fidelity digital signal processing (DSP) expert system heuristics. It is completely independent of external AI APIs or network requirements, ensuring zero-latency, secure, and resilient analysis of satellite anomalies.

* **SDR Ingestion Security:** Physical SDR integration endpoints are guarded with:
  ```http
  Authorization: Bearer ASTROVA-SDR-DEMO-KEY-2026
  ```
  Example packet ingestion request:
  ```bash
  curl -X POST http://localhost:3000/api/gnuradio/signal \
    -H "Authorization: Bearer ASTROVA-SDR-DEMO-KEY-2026" \
    -H "Content-Type: application/json" \
    -d '{"centerFrequency": 433.92, "peaks": [{"frequency": 433.95, "power": -45}]}'
  ```

---

## ⚠️ Disclaimer
Astrova is designed strictly for academic research, education, and simulation purposes. It should not be utilized with unauthorized hardware to jam, spoof, or intercept secure defense, civil, or commercial satellite networks. All signal simulations are synthetically generated or use public/open civil frequency bands.
