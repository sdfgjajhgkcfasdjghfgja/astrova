# Gizlilik Politikası

PulseGuard projesi, kullanıcıların verilerini korumayı; canlı veri akışlarının, sensör paketlerinin ve sisteme yüklenen teknik dökümanların güvenli ve şeffaf bir şekilde işlenmesini sağlamayı taahhüt eder.

---

## 🏭 1. Endüstriyel Sensör Verisi İşleme

PulseGuard, makinelerden gelen titreşim, sıcaklık ve enerji verilerini işler:

* **Bellek İçi İşleme:** Gelen tüm makine verileri **tamamen bellek içinde (in-memory)** işlenir, analiz edilir ve anlık olarak arayüze iletilir. Canlı verileri, ham sensör kayıtlarını veya fabrika konfigürasyonlarını diske kalıcı olarak kaydetmiyoruz.
* **Yerel İşleme (Local-First):** Veri akışları tamamen yerel ağınızda veya izole konteyner ağınız içinde kalır.

---

## 🔑 2. API Anahtarları ve Sırların Güvenliği

* **Doğrudan Anahtar Aktarımı:** API anahtarınız kesinlikle sadece yerel sunucunuzdaki çevre değişkenlerinden (`.env`) okunur. Harici bir PulseGuard veritabanında saklanmaz.
* **Güvenli API Vekili (Proxy):** Yapay zeka analizleri güvenli bir sunucu rotası üzerinden proxy edilerek gerçekleştirilir. Gemini API'sine yalnızca analiz anındaki teknik sensör değerleri gönderilir. Kişisel tanımlayıcı veriler, IP adresleri veya yetkisiz sistem günlükleri kesinlikle harici servislerle paylaşılmaz.

---

## 🌐 3. Üçüncü Taraf Entegrasyonlar ve Çerezler

* **Google Gemini API:** Analiz raporları üretilirken yalnızca teknik sensör verileri girdi olarak kullanılır.
* **Sıfır İzleyici Çerez Politikası:** PulseGuard kullanıcı arayüzü; hiçbir ticari izleyici, reklam çerezi veya pazarlama amaçlı takip pikseli barındırmaz.

---

## 📝 4. Politika Değişiklikleri

Güvenlik standartlarımız geliştikçe bu gizlilik bildirimini güncelleyebiliriz. Yazılımı kullanmaya devam etmeniz, bu gizlilik standartlarımızı kabul ettiğiniz anlamına gelir.
