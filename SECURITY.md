# Güvenlik Politikası 🛡️

Astrova, eğitim ve araştırma odaklı bir simülasyon yazılımı olmasına rağmen, kullanıcıların gizli çevre değişkenlerini korumaya ve güvenli veri alım yöntemlerini sürdürmeye büyük önem verir.

---

## 🔒 Güvenlik Mimarisi ve Koruma Katmanları

Platform, yetkisiz erişimleri, kimlik bilgisi sızıntılarını ve yerel yapılandırma bozulmalarını önlemek amacıyla tasarlanmış belirli güvenlik standartlarına sahiptir:

### 1. Sunucu Tarafı Sır Ayrımı (Server-Side Secret Isolation)
* **İzole Kimlik Bilgileri:** Yapay zeka analizlerini tetikleyen `GEMINI_API_KEY` ve harici SDR entegrasyonu için kullanılan `GNURADIO_AUTH_TOKEN` gibi hassas anahtarlar **yalnızca sunucu tarafında** (Node/Express ortamında) yüklenir ve doğrulanır.
* **İstemci Güvenliği:** Bu gizli anahtarlar asla istemci tarafına (tarayıcıya) gönderilmez, tarayıcı hafızasında saklanmaz veya istemci kodları içinden doğrudan erişilemez. Tarayıcıdan yapılan tüm yapay zeka ve telemetri analiz istekleri, güvenli sunucu proxy rotaları (`/api/*`) üzerinden geçirilerek filtrelenir.

### 2. Token Korumalı Donanım / SDR Ingestion Katmanı
Simüle edilmiş veya gerçek harici veri akışı sağlayan GNU Radio Companion betikleri veya harici veri sağlayıcıları, belirli uç noktalara veri gönderirken yetkilendirme taşımak zorundadır:
* **Korunan Uç Noktalar:** `POST /api/gnuradio/signal` ve `POST /api/gnuradio/inject-sim` uç noktaları token karşılaştırma ara katmanı (middleware) ile korunmaktadır.
* **Başlık Doğrulaması:** İsteklerin geçerli sayılabilmesi için `Authorization: Bearer <GNURADIO_AUTH_TOKEN>` başlığı taşımaları gerekir (Bu token `.env` dosyasında aksi belirtilmedikçe varsayılan olarak `ASTROVA-SDR-DEMO-KEY-2026` değerini alır). Yetkisiz veya geçersiz başlık içeren istekler sunucu tarafından anında `401 Unauthorized` koduyla reddedilir.

### 3. Esnek Hata Yönetimi ve Fail-Safe Sistemleri
* Uygulama başlatılırken, sunucu arka planda `GEMINI_API_KEY` anahtarının mevcut olup olmadığını denetler.
* API anahtarı girilmemişse, sistem çökmek yerine yapay zeka destekli anomali raporlama özelliklerini zarif bir şekilde devre dışı bırakır ve arayüzde bilgilendirici uyarı panelleri gösterir. Bu durum, sunucuya ait iç hata günlüklerinin (stack traces) ve sistem detaylarının yetkisiz kişilere ifşa edilmesini engeller.

---

## 🛡️ Güvenlik Açığı Bildirimi

Astrova kod tabanında tespit ettiğiniz olası bir güvenlik açığını (token atlatma, dizin geçişi veya bellek sızıntıları vb.) lütfen **kamuya açık GitHub sorunlarında (Issues) paylaşmayınız.**

Güvenli ve koordineli bir yama süreci yürütmek adına:
1. Bulgularınızı ayrıntılı olarak **security@astrova.sdr.academy** adresine (veya projenin yönetici ekibine) e-posta yoluyla iletebilirsiniz.
2. E-postanızda açığın detaylı açıklamasını, yeniden tetiklemek için gereken adımları ve varsa çalışan örnek kod parçalarını (Proof of Concept) paylaşın.
3. Raporunuzu aldıktan sonra 48 saat içinde size dönüş yapacak ve gerekli düzeltmeleri koordineli bir şekilde yayınlayacağız.
