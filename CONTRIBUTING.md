# Astrova'ya Katkıda Bulunma Rehberi 🛰️

Astrova SDR ve Uydu Telemetri Simülasyon İstasyonu'na katkıda bulunmayı düşündüğünüz için teşekkür ederiz! Bu belge; yerel geliştirme ortamının kurulmasını, kod standartlarını, TypeScript ile Python arasındaki matematiksel algoritmik uyumluluk kurallarını ve değişiklik talebi (Pull Request) gönderme sürecini açıklamaktadır.

---

## 🛠️ Yerel Geliştirme Ortamı Kurulumu

Projeyi kendi bilgisayarınızda çalıştırmak ve geliştirmek için şu adımları izleyin:

### Ön Gereksinimler
* **Node.js**: `v18+` veya daha yeni bir sürüm (ESM/CJS modül yapılarıyla uyumlu)
* **Python**: `v3.10+` (İHA ve SCADA Python anomali tespiti modellerini yerel olarak çalıştırmak ve doğrulamak için)

### Adım Adım Kurulum ve Çalıştırma
1. **Depoyu klonlayın** ve proje ana dizinine gidin:
   ```bash
   git clone <depo-adresi>
   cd astrova
   ```
2. **Npm bağımlılıklarını yükleyin**:
   ```bash
   npm install
   ```
3. **Çevre değişkenlerini yapılandırın**:
   Proje kök dizinindeki `.env.example` dosyasının bir kopyasını oluşturup adını `.env` yapın:
   ```bash
   cp .env.example .env
   ```
   Oluşturulan `.env` dosyasını düzenleyerek Gemini operasyon asistanını aktifleştirmek için geçerli bir `GEMINI_API_KEY` ekleyebilirsiniz.
4. **Geliştirme Sunucusunu Başlatın**:
   ```bash
   npm run dev
   ```
   Bu komut hem backend Express API sunucusunu hem de frontend Vite React uygulamasını aynı anda başlatır. Geliştirme sunucusuna tarayıcınızdan şu adresten ulaşabilirsiniz:
   👉 `http://localhost:3000`

---

## 🏗️ Üretim Ortamı Yapılandırması (Production Build)

Uygulamayı bir üretim sunucusunda veya Docker konteynerinde çalıştırmak üzere paketlemek için:
1. **Derleme ve Paketleme**:
   ```bash
   npm run build
   ```
   *Bu komut, istemci tarafındaki Vite/React kodlarını derleyip `/dist` klasörüne aktarır. Aynı zamanda `server.ts` Express sunucusunu `esbuild` kullanarak paketlenmiş, tek parçalık bir CommonJS modülü halinde `/dist/server.cjs` dosyasına derler.*
2. **Üretim Sunucusunu Başlatma**:
   ```bash
   npm run start
   ```

---

## 🌌 Çekirdek Teknik Standartlar ve Uyumluluk

Astrova'da kod geliştirirken lütfen aşağıdaki kurallara ve mimari standartlara uyun:

### 1. Algoritmik Eşlik (TypeScript ve Python Matematiksel Uyumu)
Telemetri izleme modülünde kullanılan Z-Skoru anomali tespit algoritmalarının Python (`tests/` ve arka uç ML simülatörleri) ile Node.js sunucu kodları arasında matematiksel olarak birebir aynı sonuçları vermesi gerekmektedir:
* **Nominal Güvenli Aralıklar**:
  * Sıcaklık: `-25.0°C` ile `75.0°C` arası
  * Batarya Seviyesi: `%10.0` ile `%100.0` arası
  * Sinyal Gücü: `-100.0 dBm` ile `-30.0 dBm` arası
  * Açısal Hız (Angular Velocity): `0.0 deg/s` ile `12.5 deg/s` arası
* **Kayan Pencere Filtresi (Rolling Window Size):** Standart sapma ve ortalama değer hesaplamaları son **30** veri noktası (tick) üzerinden hesaplanmalıdır.
* **Z-Skoru Hassasiyeti:** Z-Skorunun `3.0` barajını aşması durumu çok değişkenli bir anomali kabul edilmeli ve alarm tetiklenmelidir.

### 2. Güvenli Donanım SDR/GNU Radio Veri Akışı
GNU Radio veya simüle edilmiş harici veri aktarım uç noktaları (endpoints) token bazlı yetkilendirmeye tabidir:
* **Kritik API Uç Noktaları:** `POST /api/gnuradio/signal` ve `POST /api/gnuradio/inject-sim`
* **Demo Güvenlik Tokenı:** `ASTROVA-SDR-DEMO-KEY-2026`
* Tüm harici sinyal verisi içeren REST istekleri, `Authorization: Bearer ASTROVA-SDR-DEMO-KEY-2026` başlığını taşımalıdır, aksi takdirde sunucu `401 Unauthorized` hatası döndürecektir.

### 3. Arayüz ve Görsel Tasarım Standartları
* Tüm stil kodlamaları için **Tailwind CSS** sınıfları kullanılmalıdır. Satır içi (inline) `style` veya harici CSS dosyaları oluşturulmamalıdır.
* Tipografi olarak ana arayüz elemanlarında **Inter** yazı tipi, grafik veri etiketleri, terminal çıktıları ve sinyal günlüklerinde ise **JetBrains Mono** kullanılmalıdır.
* Arayüz teması, **mat antrasit tonlar ve neon siber-fiziksel göstergeler** içeren sade, teknik ve göz yormayan bilimsel kontrol odası estetiğiyle uyumlu kalmalıdır.

---

## 🤝 Değişiklik Gönderme Adımları (Contribution Workflow)

1. **Mevcut Sorunları (Issues) İnceleyin:** Çözmek istediğiniz bir hata veya eklemek istediğiniz bir simülasyon özelliği için mevcut iş kayıtlarını inceleyin veya yeni bir kayıt açın.
2. **Yeni Bir Dal (Branch) Açın:**
   ```bash
   git checkout -b feature/yeni-simulasyon-ozelligi
   ```
3. **Kodunuzu Test Edin ve Düzenleyin:** Kodunuzun TypeScript derleyicisinden başarıyla geçtiğinden ve sözdizimi (lint) kurallarına uyduğundan emin olun:
   ```bash
   npm run lint
   ```
4. **Matematiksel Kararlılık Testlerini Çalıştırın:**
   ```bash
   npm run test
   ```
5. **Değişiklik Talebi (Pull Request) Gönderin:** Değişikliklerinizi net ve açıklayıcı commit mesajlarıyla ana depoya gönderebilirsiniz.
