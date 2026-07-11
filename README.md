# 🛰️ Astrova — Eğitim ve Araştırma Amaçlı Siber-Fiziksel Uydu Telemetri ve SDR Simülasyon Platformu

![Astrova Banner](./packages/frontend/src/assets/images/astrova_banner_1782543879024.jpg)

**Astrova**, uzay sistemleri ve kritik karasal altyapılar için tasarlanmış, **eğitim ve araştırma amaçlı bir siber-fiziksel simülasyon platformudur**. Platform; yazılım tabanlı radyo (SDR) spektrum analizini, 3D yörünge mekaniklerini, çok değişkenli (multivariate) telemetri anomali tespitini ve yapay zeka destekli teknik kılavuz RAG (Retrieval-Augmented Generation) analizlerini güvenli ve etkileşimli bir sanal laboratuvar ortamında bir araya getirir.

Platform, hem akademik araştırmacıların hem de öğrencilerin gerçekçi bir "Yer İstasyonu" (Ground Station) arayüzünü deneyimlemesini sağlarken, arka planda çalışan matematiksel modeller ve yapay zeka ajanları ile gelişmiş karar destek sistemlerini simüle eder.

---

## 📸 Canlı Uygulama Ekran Görüntüsü

![Astrova Dashboard](./packages/frontend/src/assets/images/astrova_dashboard_v3_1783759719495.jpg)
*Gerçek zamanlı çalışan Astrova Yer İstasyonu kontrol paneli; SDR şelale (waterfall) spektrogramı, 3D Dünya yörünge takipçisi, çok değişkenli anomali grafikleri ve yapay zeka operasyon günlüklerini tek bir ekranda sunar.*

---

## ⚡ Gerçek Zamanlı Çalışan Özellikler

Astrova platformunda simüle edilen ve aktif olarak çalışan temel modüller şunlardır:

1. **🌍 3D Yörünge Takip Sistemi (3D Constellation Tracker):**
   * SGP4 yörünge mekaniği algoritmalarını (`satellite.js` entegrasyonu ile) kullanarak LEO (Alçak Dünya Yörüngesi) uydularının (örn: ISS, Hubble, Göktürk-1, Göktürk-2, NOAA-19 ve Tiangong) anlık konumlarını 3D küre ve 2D harita üzerinde canlı simüle eder.
   * NORAD/CelesTrak üzerinden Two-Line Element (TLE) verilerini gerçek zamanlı olarak çekebilir ve aktif uydunun yer istasyonu görüş açısı (Azimut/Elevasyon) koordinatlarını hesaplar.

2. **📡 SDR Spektrum & DSP Görselleştirme (SDR Waterfall):**
   * Frekans spektrumunu gerçek zamanlı şelale (waterfall) spektrogramı ile simüle eder.
   * GNU Radio entegrasyonu veya entegre sinyal enjektörü aracılığıyla gelen sinyal gücü (power), doppler kayması (Doppler shift), sönümlenme ve parazit karakteristiklerini dinamik olarak görselleştirir.

3. **🧠 Yapay Zeka Destekli Operasyon Analisti (Gemini AI RAG & FDIR):**
   * **Gemini Pro Ajanı:** Tespit edilen spektral sinyal zirvelerini analiz ederek olası sinyal türünü (meteoroloji balonu, acil durum vericisi vb.) tahmin eder ve aksiyon planı önerir.
   * **Belge Tabanlı RAG (Embedding):** Teknik uydu el kitapları (PDF veya TXT) sisteme yüklenip indekslenebilir. Chroma DB simülasyonu sayesinde, el kitapları içinden anomali durumlarına yönelik anlamsal (semantic) aramalar yapılarak operasyon ekibine teknik çözümler sunulur.

4. **📊 Çok Değişkenli Telemetri Anomali Tespiti:**
   * Sıcaklık, batarya şarj seviyesi, sinyal gücü ve açısal hız verilerini içeren 4 boyutlu telemetri akışını sürekli izler.
   * Standart sapma ve kayan pencere (rolling window - 30 tick) Z-Skoru algoritmaları ile çok değişkenli anomali tespiti gerçekleştirir. Node.js (TypeScript) ve Python motorları arasında birebir anomali tespit uyumluluğu barındırır.

5. **🛡️ Siber-Fiziksel Savunma Modülleri (Drone RF & IIoT Sabotaj Analiz):**
   * **Taktik İHA RF Analizi:** 915MHz ve L1 bandında çalışan drone kontrol linklerinde oluşan RF karıştırma (jamming) ve yanıltma (spoofing) saldırılarını tespit eden Python tabanlı ML modellerini simüle eder.
   * **Endüstriyel IoT / SCADA Sabotaj Analizi:** Kritik altyapılardaki türbin sıcaklığı, RPM ve MODBUS paket deformasyonlarından yola çıkarak fiziksel sabotaj girişimlerini sınıflandırır.

---

## 🏗️ Sistem Mimarisi

Astrova, istemci tarafında zengin bir web arayüzü sunarken, arka planda Express ve Python servislerini koordine eder:

```
[ Donanım SDR / Dahili Sinyal Enjektörü ] ──> [ Express.js API Sunucusu ] ──> [ Server-Sent Events (SSE) ] ──> [ React UI ]
                                                   │
                       ┌───────────────────────────┴───────────────────────────┐
                       ▼ (Alt İşlem / Subprocess)                               ▼ (Dinamik Güvenli Fallback)
             [ Python Analiz Servisleri ]                             [ TypeScript Matematik Çekirdeği ]
       - drone_rf_analyzer.py (915MHz/L1 ML)                     - Yerel Çok Değişkenli Anomali Algoritmaları
       - industrial_iot_detector.py (SCADA/Modbus)               - Gelişmiş FDIR Operasyonel Karar Ağaçları
```

---

## 🚀 Kurulum ve Çalıştırma

Astrova'yı kendi bilgisayarınızda kurup çalıştırmak için aşağıdaki adımları izleyin. Sistem test edilmiş ve kararlı hale getirilmiştir.

### 📋 Ön Gereksinimler
Sisteminizde aşağıdaki araçların kurulu olduğundan emin olun:
* **Node.js:** `v18` veya üzeri (`v20+` tavsiye edilir)
* **Python:** `v3.10` veya üzeri (İHA ve SCADA Python analizörlerini çalıştırmak için)

---

### Adım Adım Kurulum

#### 1. Projeyi Klonlayın ve Dizinine Girin
```bash
git clone <depo_adresi>
cd astrova
```

#### 2. Bağımlılıkları Yükleyin
Ana dizindeyken npm bağımlılıklarını yükleyin (Vite, Express, Electron, Three.js ve Recharts vb. paketler otomatik kurulur):
```bash
npm install
```

#### 3. Çevre Değişkenlerini Yapılandırın
Projenin ana dizininde bulunan `.env.example` dosyasını `.env` adıyla kopyalayın:
```bash
cp .env.example .env
```
Ardından oluşturduğunuz `.env` dosyasını bir metin editörüyle açarak yapay zeka analizlerini etkinleştirmek için **Gemini API anahtarınızı** ekleyin:
```env
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_real_gemini_api_key_here
GNURADIO_AUTH_TOKEN=ASTROVA-SDR-DEMO-KEY-2026
JWT_SECRET=astrova-secure-ground-station-jwt-secret-2026
```

#### 4. Uygulamayı Geliştirme (Development) Modunda Başlatın
Aşağıdaki komut, arka planda hem Express.js API sunucusunu hem de Vite tabanlı React frontend uygulamasını aynı anda başlatacaktır:
```bash
npm run dev
```
Uygulama başarıyla başladıktan sonra tarayıcınızda otomatik olarak veya manuel olarak şu adrese gidin:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧪 Doğrulama ve Testler

Astrova platformu, algoritmik kararlılığı doğrulamak için dahili duman ve uyumluluk testleri içerir:

* **Sistem Lint Kontrolü:**
  ```bash
  npm run lint
  ```
* **Matematiksel ve Algoritmik Testler (TypeScript ve Python Karşılaştırmalı):**
  ```bash
  npm run test
  ```
  *(Bu komut hem backend bütünlük testlerini hem de TypeScript/Python anomali tespiti algoritma uyumluluğunu test eder.)*

---

## ⚠️ Yasal Uyarı ve Sorumluluk Reddi
Astrova **yalnızca eğitim, akademik araştırma ve simülasyon amaçları için tasarlanmıştır**. Hiçbir şekilde gerçek uçuş sistemlerini sabote etme, yetkisiz spektrum dinleme veya radyo yayınlarını engelleme yeteneğine sahip değildir ve bu tür amaçlar için kullanılamaz. Kullanıcılar, spektrum analizörleri veya SDR cihazları bağlarken yerel telekomünikasyon kurallarına ve frekans tahsis yasalarına uymakla yükümlüdür.
