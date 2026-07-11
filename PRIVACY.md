# Gizlilik Politikası 👤

Astrova projesi, kullanıcıların gizliliğini korumayı, canlı veri akışlarının, simüle edilmiş telemetri paketlerinin ve arayüze yüklenen tanısal dökümanların güvenli ve şeffaf bir şekilde işlenmesini sağlamayı taahhüt eder.

---

## 🛰️ 1. Telemetri ve RF Spektrum Verisi İşleme (Yalnızca Bellek İçi)

Astrova, yüksek frekanslı yapay uydu telemetri paketlerini (batarya voltajı, sıcaklık, açısal hızlar vb.) ve yazılım tabanlı radyo (SDR) spektrum zirve verilerini işler:

* **Sıfır Kalıcı Günlük Tutma (Zero Persistent Logging):** Gelen tüm telemetri akışı **tamamen bellek içinde (in-memory)** işlenir, analiz edilir ve sunucudan bağlı web tarayıcısına Server-Sent Events (SSE) teknolojisi kullanılarak anlık olarak iletilir. Canlı telemetri veri setlerini, ham spektrum kayıtlarını veya coğrafi yer istasyonu konumlarını diske veya harici bir bulut veritabanına kalıcı olarak kaydetmeyiz.
* **Yerel İşleme (Local-First):** GNU Radio Companion veya yerel simülatörler üzerinden gelen veri akışları tamamen yerel ağınızda (localhost) veya izole Docker konteyner ağınız içinde kalır.

---

## 🔑 2. API Anahtarları ve Sırların Güvenliği

Yapay zeka destekli yer istasyonu analizlerini aktifleştirmek için isteğe bağlı olarak bir `GEMINI_API_KEY` sağlayabilirsiniz:

* **Doğrudan Anahtar Aktarımı:** API anahtarınız kesinlikle sadece yerel sunucunuzdaki çevre değişkenlerinden (`.env`) veya gizli anahtar yönetim mekanizmanızdan okunur. Harici bir Astrova veritabanında saklanmaz veya istemci tarafındaki (tarayıcı) Javascript kodlarına açık edilmez.
* **Güvenli API Vekili (Proxy):** Yapay zeka analizleri güvenli bir sunucu rotası (`/api/gemini/analyze` veya benzeri) üzerinden proxy edilerek gerçekleştirilir. Gemini API'sine yalnızca anomali anındaki telemetri sayısal değerleri (örn: sıcaklık ve voltaj değerleri) gönderilir. Kişisel tanımlayıcı veriler, IP adresleri veya yetkisiz sistem günlükleri kesinlikle OpenAI veya Google servislerine aktarılmaz.

---

## 🌐 3. Üçüncü Taraf Entegrasyonlar ve Çerezler

* **Google Gemini API:** "ANOMALY ANALYZE" butonuna tıkladığınızda, uygulama `@google/genai` resmi SDK'sını kullanarak analiz raporları üretir. Bu analizler sırasında sadece simüle edilmiş teknik telemetri verileri girdi olarak kullanılır. Google'ın yapay zeka verilerini nasıl işlediği hakkında detaylı bilgi için Google Gizlilik Politikası ve Gemini API Hizmet Şartları'nı inceleyebilirsiniz.
* **Sıfır İzleyici Çerez Politikası:** Astrova kullanıcı arayüzü; hiçbir ticari izleyici, reklam çerezi veya pazarlama amaçlı takip pikseli (Google Analytics, Facebook Pixel vb.) barındırmaz. Operasyonel analiz çalışmalarınız tamamen bağımsız ve özel kalır.

---

## 📝 4. Politika Değişiklikleri

Güvenlik standartlarımız geliştikçe veya yeni yerel alım protokolleri ekledikçe bu gizlilik bildirimini zaman zaman güncelleyebiliriz. Yazılımı kullanmaya devam etmeniz, yerel odaklı gizlilik standartlarımızı kabul ettiğiniz anlamına gelir.
