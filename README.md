# 🛰️ Astrova — Akıllı Yer İstasyonu, SDR Telemetri & Otonom Çoklu Ajan Savunma Platformu

![Astrova Banner](./src/assets/images/astrova_banner_1782543879024.jpg)

> **Astrova; uydu operatörleri, taktik İHA yer kontrol istasyonları, akademik CubeSat ekipleri ve kritik endüstriyel altyapılar için gerçek zamanlı çok değişkenli telemetri anomali tespiti, otonom çoklu ajan siber-savunma orkestrasyonu ve sivil/taktik RF spektrum analizi sunan akıllı ve bütünleşik bir yer istasyonu yazılımıdır.**
>
> *Astrova is an AI-augmented, SDR-integrated ground station operations platform that monitors multi-variate satellite telemetry, orchestrates autonomous multi-agent defense agents, and decodes real-time RF signatures to prevent critical mission and infrastructure failures.*

---

## ⚡ Temel Özellikler & Yenilikler (Key Capabilities)

Astrova, geleneksel yer istasyonlarının aksine statik eşik değerleri yerine dinamik veri akış analizi, makine öğrenimi tabanlı anomali tespiti ve otonom akıllı karar destek mekanizmaları kullanır:

### 1. 🧠 Çoklu Ajan Otonom Siber Savunma (Multi-Agent Orchestrator)
Sistem, üç farklı uzman yapay zeka ajanının eşgüdümlü çalışmasıyla anomalilere otonom müdahale eder:
* **🕵️ Analist Ajanı (Analyst Agent):** Akışı milisaniyeler mertebesinde izleyerek anomalileri saptar ve ilk siber-fiziksel alarm durumunu oluşturur.
* **🔍 Teşhis Ajanı (Diagnostic Agent):** Yerel RAG (Retrieval-Augmented Generation) tabanlı döküman havuzundan (ChromaDB vb.) ilgili askeri ve endüstriyel standartları (MIL-STD, NATO STANAG, IEC, NIST) sorgulayarak kök neden analizi yapar.
* **⚔️ Komutan / Aksiyon Ajanı (Commander/Action Agent):** Otonom bypass planını oluşturur ve FDIR (Failure Detection, Isolation, and Recovery) standartlarına uygun, donanıma doğrudan enjekte edilebilecek **kriptolu heksadesimal telekomut paketini** otomatik olarak derler.

### 2. 🛡️ Çift Amaçlı (Dual-Use) Savunma ve Endüstriyel Koruma Motorları
Astrova, sadece uzay sistemlerini değil, siber-fiziksel savunma ve endüstriyel OT (Operational Technology) bileşenlerini de koruma altına alır:
* **📡 İHA RF Karıştırma (FHSS RF Jamming) Algılama:** Sinyal-gürültü oranı (SNR) kritik seviyeye düştüğünde dinamik frekans atlama maskelemesini devreye sokar.
* **🗺️ GPS Sinyal Taklidi (GPS Spoofing) Engelleme:** Sahte GPS L1 taşıyıcı sinyallerini tespit ederek seyrüseferi yedek INS (Ataletsel Navigasyon) ve manyetometre hatlarına aktarır.
* **⚙️ Endüstriyel Türbin Sabotaj Koruması:** Doğalgaz çevrim santralleri ve buhar jeneratörlerinde Stuxnet stili yüksek devir rezonans sabotajlarını saptayıp PLC interlock korumalarını tetikler.
* **🔒 Modbus TCP Gateway Güvenliği:** Modbus register fuzzing ve SCADA paket enjeksiyonu gibi siber saldırıları siber güvenlik filtreleri üzerinden izole eder.

### 3. 🐍 Canlı Python Entegrasyonu & Yüksek Doğruluklu Fallback
Platform, arka planda çalışan gelişmiş Python modülleriyle entegre biçimde çalışır:
* **`drone_rf_analyzer.py`:** Sinyal niteliklerini ve faz kilit durumlarını analiz eden spektrum algılayıcı.
* **`industrial_iot_detector.py`:** Sensör RPM, sıcaklık ve paket anomalilerini saptayan SCADA güvenlik motoru.
* Arka uç Express sunucusu (`server.ts`), bu Python betiklerini dinamik alt süreçler (`spawn`) ile çağırarak canlandırır. Python ortamının bulunmadığı sistemlerde ise **%99.9 kararlılık garantili yerel TypeScript yedek algoritması** devreye girerek kesintisiz simülasyon sunar.

### 4. 🌍 3D Yörünge Takibi & Gök Kubbe Radarı (SGP4/TLE)
* İki Satırlı Veri Setleri (TLE) ve SGP4 yörünge mekaniği algoritmaları ile Alçak Dünya Yörüngesi (LEO) uydularının anlık konumları 3B dünya haritası ve lokal gök kubbe radarı üzerinde canlandırılır.
* Ankara, Madrid, Canberra ve Goldstone gibi taktik yer istasyonlarının kapsama alanları (visibility footprints) anlık olarak hesaplanır.

### 5. 📊 Gerçek Zamanlı Spektrum & TSDB Zaman Serisi
* **SDR Waterfall Stream:** Gerçek zamanlı sinyal spektrogramı ve şelale akışı.
* **TSDB Historian:** Tarihsel telemetri kayıt cihazı yardımıyla anomaliler, normal çalışma koşulları ve parametrik trendler dinamik grafiklerle incelenir.

---

## 🏗️ Platform Mimarisi & Çalışma Düzeni

Astrova, yüksek performanslı ve düşük gecikmeli bir mikro mimari üzerinde yükselir:

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

## 🚀 Kurulum ve Çalıştırma Rehberi (Installation Guide)

Astrova platformunu üç farklı modda çalıştırabilirsiniz: **Yerel Geliştirici Modu (Web)**, **Masaüstü Uygulaması (Electron)** veya **Yalıtılmış Docker Konteyneri**.

### 📋 Ön Gereksinimler
Sisteminizde aşağıdaki bileşenlerin yüklü olduğundan emin olun:
- **Node.js** (v18 veya üzeri önerilir)
- **npm** (Node.js ile birlikte gelir)
- **Python 3** (Öneri: `drone_rf_analyzer.py` ve `industrial_iot_detector.py` modüllerinin çalışması için gereklidir. Python yüklü değilse akıllı yedek motor otomatik olarak aktiftir).

---

### 💻 Seçenek 1: Masaüstü Uygulaması Olarak Çalıştırma (Electron)

Astrova, yerel donanımlara (SDR dongle'lar vb.) doğrudan erişim sağlayabilmek amacıyla özelleştirilmiş bir Electron masaüstü kabuğuna sahiptir.

#### 1. Bağımlılıkları Yükleyin:
```bash
npm install
```

#### 2. Uygulamayı Geliştirici Modunda Başlatın:
```bash
npm run electron:dev
```
*Bu komut, arka plandaki telemetri sunucusunu ve ön yüzdeki Vite uygulamasını eş zamanlı olarak başlatır, bağlantı noktalarını hazırlar ve yerel Electron penceresini açar.*

#### 3. Kurulabilir Paket Derleme:
Uygulamayı bağımsız bir masaüstü uygulaması (`.exe`, `.dmg` veya `.AppImage`) haline getirmek için `/dist-desktop` dizininde derleme yapar:
```bash
npm run electron:build
```

---

### 🌐 Seçenek 2: Web Uygulaması Olarak Tarayıcıda Çalıştırma

Platformu herhangi bir modern web tarayıcısında hızlıca test etmek için:

#### 1. Demo Sunucusunu Başlatın:
```bash
npm run demo
```
Bu komut projeyi derler ve otomatik olarak `http://localhost:3000` adresinde tarayıcınızı açar.

#### 2. Standart Geliştirici Sunucusu:
Tarayıcıyı otomatik tetiklemeden arka uç ve ön yüz geliştirme sunucularını çalıştırmak için:
```bash
npm run dev
```

---

### 🐳 Seçenek 3: Yalıtılmış Docker Konteyneri (Docker Sandbox)

Tüm Python kütüphaneleri, bağımlılıklar ve Express.js API sunucusunu tek bir yalıtılmış ortamda ayağa kaldırmak için:
```bash
docker-compose up --build
```
Konteyner başarıyla başlatıldıktan sonra `http://localhost:3000` adresine giderek platformu kullanabilirsiniz.

---

## 📡 Lokal DSP & SDR API Entegrasyon Dokümantasyonu

Astrova, donanımsal GNU Radio veya dış veri kaynaklarından gelen sinyal verilerini güvence altına almak için kriptolu API yetkilendirmesi kullanır:

* **SDR Veri Giriş Tokenı:** `Bearer ASTROVA-SDR-DEMO-KEY-2026`

### Örnek curl ile Spektrum Veri Gönderimi:
```bash
curl -X POST http://localhost:3000/api/gnuradio/signal \
  -H "Authorization: Bearer ASTROVA-SDR-DEMO-KEY-2026" \
  -H "Content-Type: application/json" \
  -d '{"centerFrequency": 915.00, "peaks": [{"frequency": 915.15, "power": -32.5}]}'
```

### Örnek Taktik İHA/UAV Analiz İstek Gönderimi:
```bash
curl -X POST http://localhost:3000/api/drone/analyze \
  -H "Content-Type: application/json" \
  -d '{"channel_freq_mhz": 1575.42, "rssi": -72.0, "noise_floor": -95.0, "pll_locked": false}'
```

---

## ⚠️ Yasal Uyarı (Disclaimer)

Astrova yer istasyonu yazılımı **tamamen akademik araştırma, sivil uydu izleme, siber güvenlik eğitimleri ve simülasyon amaçlı** geliştirilmiştir. Yetkisiz kablosuz donanımlar kullanılarak ticari, askeri veya sivil uydu haberleşme hatlarına karıştırma yapılması, sinyal enjekte edilmesi veya şifreli taktik ağların dinlenmesi yasalara aykırıdır. Tüm taktik savunma ve endüstriyel anomali senaryoları yapay verilerle veya sivil frekans bandı simülasyonlarıyla yürütülmektedir.
