# 🛰️ Astrova — Akademik Yer İstasyonu, SDR Simülasyonu & Otonom Telemetri Analiz Platformu

![Astrova Banner](./src/assets/images/astrova_banner_1782543879024.jpg)

> **Astrova; üniversite CubeSat takımları, havacılık araştırmacıları ve sivil uzay toplulukları için geliştirilmiş açık kaynaklı, akademik bir yer istasyonu simülasyon yazılımıdır. Gerçek zamanlı telemetri anomalilerini izler, sivil SDR sinyallerini görselleştirir ve çoklu ajanlı yapay zeka entegrasyonu ile otonom teşhis senaryolarını simüle eder.**
>
> *Astrova is an open-source, academic ground station simulation platform built for university CubeSat teams, aerospace researchers, and civil space enthusiasts. It visualizes software-defined radio (SDR) spectra, tracks orbital visibility, and demonstrates multi-agent diagnostics.*

---

## ⚡ Temel Özellikler (Key Capabilities)

Astrova, geleneksel statik izleme araçlarından farklı olarak, sivil uydu iletişim senaryolarında yapay zeka destekli otonom teşhis ve görsel spektrum analizi sunar:

### 1. 🧠 Çoklu Ajan Teşhis Simülasyonu (Multi-Agent Diagnostics)
Sistem, üç farklı uzman yapay zeka ajanının (Analist, Teşhis ve Aksiyon) koordineli çalışmasıyla simüle edilmiş telemetri anomalilerine otonom müdahale etme süreçlerini gösterir:
* **🕵️ Analist Ajanı (Analyst):** Canlı akışı izleyerek olağandışı frekans sapmalarını veya paket kayıplarını saptar.
* **🔍 Teşhis Ajanı (Diagnostic):** Akademik standartlar ve referans kılavuzları üzerinden anomaliye dair kök neden analizi üretir.
* **⚔️ Aksiyon Ajanı (Action):** Düzeltici yörünge/iletişim komutlarını otonom olarak simüle eder ve yer istasyonunun tepki süresini gösterir.

### 2. 🛡️ Sivil Savunma & Spektrum Simülasyonu
* **📡 RF Sinyal Karışması Analizi:** Sivil haberleşme bantlarında gürültü eşiğindeki değişimleri, doppler kaymalarını ve sinyal zayıflamalarını anlık olarak izler.
* **🗺️ GPS Sinyal Doğrulama Simülasyonu:** İyonosferik etkilerden veya sivil sinyal bozulmalarından kaynaklanan GPS sapmalarını tespit eder ve ataletsel navigasyon (INS) yedeklemesini canlandırır.
* **⚙️ Endüstriyel IoT & SCADA İzleme:** Akademik araştırmalarda kullanılmak üzere, rüzgar jeneratörleri veya sivil su pompaları gibi altyapıların telemetri takibini ve basit anomalilerini simüle eder.

### 3. 🐍 Python ve TypeScript Çift Motoru (Dual-Engine)
* **`drone_rf_analyzer.py` / `industrial_iot_detector.py`:** Sinyal niteliklerini analiz eden arka uç Python analiz betikleri.
* **TypeScript Akıllı Yedek (Fallback):** Sunucuda Python ortamı yüklü olmasa bile, platform kesintisiz çalışarak tarayıcıda %100 kararlı yerel TypeScript simülasyon motorunu çalıştırır.

### 4. 🌍 3D Yörünge Takibi & Gök Kubbe Radarı (SGP4/TLE)
* Sivil İki Satırlı Veri Setleri (TLE) ile Alçak Dünya Yörüngesi (LEO) uydularının konumları 3B dünya üzerinde simüle edilir.
* Akademik gözlem istasyonlarının (Ankara, Madrid, Canberra) kapsama alanları (visibility footprints) geometrik hesaplamalarla görselleştirilir.

---

## 🏗️ Platform Mimarisi (Architecture)

```
[ Fiziksel SDR / Simüle Spektrum ] ──> [ Express.js Ingestion Broker ] ──> [ Server-Sent Events ] ──> [ React UI ]
                                                   │
                        ┌───────────────────────────┴───────────────────────────┐
                        ▼ (Spawn Subprocess)                                    ▼ (Dynamic Fallback Engine)
              [ Python Core Services ]                                 [ TypeScript Security Core ]
        - drone_rf_analyzer.py (915MHz/L1)                       - Local GCS/UAV RF Anomaly Model
        - industrial_iot_detector.py (SCADA)                     - Embedded FDIR State Heuristics
```

---

## 🚀 Kurulum ve Çalıştırma (Installation & Quickstart)

### 💻 Masaüstü Uygulaması (Electron)
```bash
# Bağımlılıkları yükleyin
npm install

# Masaüstü uygulamasını geliştirici modunda başlatın
npm run electron:dev

# Uygulama paketi (.exe, .dmg, .AppImage) üretin
npm run electron:build
```

### 🌐 Web Tarayıcısı Üzerinden Çalıştırma
```bash
# Otomatik entegre demo sunucusunu tarayıcıda açın
npm run demo

# Alternatif olarak geliştirme sunucusunu başlatın
npm run dev
```

### 🐳 Docker Konteyneri
```bash
docker-compose up --build
```

---

## ⚠️ Yasal ve Akademik Uyarı (Disclaimer)

Astrova yer istasyonu yazılımı **tamamen akademik araştırma, sivil uydu izleme simülasyonları ve siber-fiziksel güvenlik eğitimleri amaçlı** geliştirilmiştir. Yetkisiz kablosuz donanımlar kullanılarak ticari, askeri veya sivil haberleşme hatlarına müdahale edilmesi yasalara aykırıdır. Projedeki tüm veriler, spektrum analizleri ve anomali senaryoları yapay verilerle ve eğitim amaçlı simülasyonlarla yürütülmektedir.
