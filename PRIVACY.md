# Privacy Policy

Astrova is committed to protecting your privacy and ensuring transparency in how live data feeds, telemetry packets, and diagnostic inputs are processed.

---

## 🛰️ 1. Telemetry and RF Data Processing (In-Memory Only)

Astrova processes high-frequency satellite telemetry (such as battery charge, temperatures, angular velocities, and signal-to-noise ratios) and Software Defined Radio (SDR) spectral peaks:

* **Zero Persistent Logging:** All incoming telemetry is streamed, processed, and analyzed **entirely in-memory** or dispatched live via Server-Sent Events (SSE) to connected web browsers. We do not persist real-time telemetry datasets, signal captures, or physical location data to disk or cloud databases.
* **Local Ingestion:** Live GNU Radio companion streams remain completely local to your hosting environment or designated docker container network.

---

## 🔑 2. API Key and Secret Safety

To power declassified AI space briefings, you may optionally supply a `GEMINI_API_KEY`:

* **Direct Key Transit:** Your API key is retrieved strictly from the server's local environment variables or secrets store. It is never stored on external databases or exposed to client-side scripts.
* **Safe Proxies:** All AI analysis is performed through a secure server-side route (`/api/gemini/analyze`). The client browser sends only the raw, anonymous telemetry payload (e.g., specific temperatures and battery levels) to be summarized. No personal identifiers, server metadata, or unauthorized system logs are sent.

---

## 🌐 3. Third-Party Services & Integrations

* **Google Gemini API:** When you click "ANOMALY ANALYZE", the application uses the `@google/genai` SDK to fetch declassification details from Google's Gemini models. The payload contains only mock or simulated satellite telemetry fields. Please refer to Google's Privacy Policy and AI Terms of Service for details on how API inputs are processed.
* **Zero Analytics Cookies:** The Astrova front-end does not include commercial trackers, marketing cookies, or tracking pixels (e.g., Google Analytics, Facebook Pixel). Your operational workflow remains fully private.

---

## 📝 4. Changes to This Policy

We may update this privacy statement occasionally to reflect improvements in our data security practices or updates to our secure ingestion layers. Continued use of the application indicates acceptance of our local-first, privacy-oriented telemetry protocols.
