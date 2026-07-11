# PulseGuard'a Katkıda Bulunma Rehberi

PulseGuard endüstriyel makine izleme ve kestirimci bakım platformuna katkıda bulunmayı düşündüğünüz için teşekkür ederiz! Bu belge; yerel geliştirme ortamının kurulmasını, kod standartlarını, makine verisi analiz algoritmalarının uyumluluk kurallarını ve değişiklik talebi (Pull Request) gönderme sürecini açıklamaktadır.

---

## 🛠️ Yerel Geliştirme Ortamı Kurulumu

Projeyi kendi bilgisayarınızda çalıştırmak ve geliştirmek için şu adımları izleyin:

### Ön Gereksinimler
* **Node.js**: `v18+`
* **Python**: `v3.10+` (Makine sağlığı ve titreşim analizi modellerini yerel olarak çalıştırmak ve doğrulamak için)

### Adım Adım Kurulum
1. **Depoyu klonlayın**:
   ```bash
   git clone <depo-adresi>
   cd pulseguard
   ```
2. **Npm bağımlılıklarını yükleyin**:
   ```bash
   npm install
   ```
3. **Çevre değişkenlerini yapılandırın**:
   `.env.example` dosyasının bir kopyasını `.env` adıyla oluşturun ve gerekli API anahtarlarını yapılandırın.
4. **Geliştirme Sunucusunu Başlatın**:
   ```bash
   npm run dev
   ```
   👉 `http://localhost:3000`

---

## 🏗️ Üretim Ortamı Yapılandırması (Production Build)

Uygulamayı bir üretim sunucusunda çalıştırmak için:
1. **Derleme ve Paketleme**:
   ```bash
   npm run build
   ```
2. **Üretim Sunucusunu Başlatma**:
   ```bash
   npm run start
   ```

---

## 🌌 Teknik Standartlar

PulseGuard'da kod geliştirirken lütfen aşağıdaki standartlara uyun:

### 1. Algoritmik Eşlik
Makine izleme modülünde kullanılan anomali tespit algoritmalarının Python ile Node.js sunucu kodları arasında tutarlı sonuçlar vermesi gerekmektedir.
* **Kayan Pencere Filtresi (Rolling Window Size):** Hesaplamalar son **30** veri noktası üzerinden yapılmalıdır.
* **Z-Skoru Hassasiyeti:** Z-Skorunun `3.0` barajını aşması durumu anomali kabul edilmeli ve uyarı tetiklenmelidir.

### 2. Arayüz ve Görsel Tasarım
* **Tailwind CSS** sınıfları kullanılmalıdır.
* Tipografi olarak ana arayüz elemanlarında **Inter**, teknik veriler ve günlüklerde ise **JetBrains Mono** kullanılmalıdır.
* Tema, profesyonel bir endüstriyel kontrol merkezi estetiğiyle (koyu gri ve mavi-yeşil accent) uyumlu olmalıdır.

---

## 🤝 Değişiklik Gönderme Adımları

1. **İş Kayıtlarını (Issues) İnceleyin:** Çözmek istediğiniz bir hata veya yeni özellik için mevcut iş kayıtlarını inceleyin veya yeni bir kayıt açın.
2. **Yeni Bir Dal (Branch) Açın:**
   ```bash
   git checkout -b feature/yeni-ozellik
   ```
3. **Kodunuzu Test Edin:**
   ```bash
   npm run lint
   npm run test
   ```
4. **Değişiklik Talebi (Pull Request) Gönderin.**
