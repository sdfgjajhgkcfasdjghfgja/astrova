# Security Policy

## Supported Versions

The security of Astrova is a top priority. We actively patch and maintain the current major release version:

| Version | Supported          |
| ------- | ------------------ |
| v1.0.x  | :white_check_mark: |
| < v1.0  | :x:                |

---

## 🔒 Security Architecture & Guardrails

To prevent unauthorized configuration drift, dual-use exposure, or credential leaks, Astrova enforces several secure architecture designs:

### 1. Server-Side Secret Isolation (No Client Leakage)
* **Secret Isolation:** High-privilege API keys (such as `GEMINI_API_KEY`) and hardware bridge authentication tokens (such as `GNURADIO_AUTH_TOKEN`) are loaded and verified **strictly server-side** inside our Node/Express environment (`server.ts`).
* **Client Boundary:** These secrets are never sent to, stored in, or made accessible to the browser client. Any client-side interactions with Gemini or GNU Radio pipelines route through secure, authenticated server-side proxies (`/api/*`).

### 2. Token-Protected Hardware/SDR Ingestion
Any external streaming inputs—including active GNU Radio companion scripts, remote SDR rigs, or peak scanners—must carry valid authentication headers:
* **Route Guards:** Endpoints `POST /api/gnuradio/signal` and `POST /api/gnuradio/inject-sim` are gated by a specialized token comparison middleware.
* **Header Matching:** Requesters must provide `Authorization: Bearer <GNURADIO_AUTH_TOKEN>` (which defaults to `ASTROVA-SDR-DEMO-KEY-2026` if not defined in your `.env` file). Unauthorized requests are instantly rejected with a `401 Unauthorized` block.

### 3. Graceful Key Verification & Fail-Safes
* The server performs a safe initialization check on boot to verify whether `GEMINI_API_KEY` is set.
* If a key is absent, the backend disables the declassification decoder pipeline gracefully and issues standard warning headers rather than crashing. This avoids exposing raw internal stack traces or server errors to potential external evaluators.

---

## 🛡️ Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability (such as a token bypass, directory traversal, or memory leak), please report it responsibly:
1. Email your findings directly to the project security response team at **security@astrova.sdr.academy** (or your designated organization contact).
2. Include a detailed description of the issue, step-by-step instructions to reproduce the vulnerability, and a potential proof-of-concept if available.
3. Allow us up to 48 hours to acknowledge your report and coordinate a fix before disclosing it publicly.
