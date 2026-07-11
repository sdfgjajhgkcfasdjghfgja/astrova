# Güvenlik Politikası

PulseGuard, endüstriyel tesisler için geliştirilmiş bir izleme platformudur. Kullanıcıların verilerini korumaya ve güvenli veri alım yöntemlerini sürdürmeye büyük önem veririz.

---

## 🔒 Güvenlik Mimarisi ve Koruma Katmanları

Platform, yetkisiz erişimleri ve kimlik bilgisi sızıntılarını önlemek amacıyla belirli güvenlik standartlarına sahiptir:

### 1. Sunucu Tarafı Sır Ayrımı
* **İzole Kimlik Bilgileri:** Yapay zeka analizlerini tetikleyen anahtarlar ve endüstriyel sensör entegrasyonu için kullanılan veriler **yalnızca sunucu tarafında** yüklenir ve doğrulanır.
* **İstemci Güvenliği:** Bu gizli anahtarlar asla istemci tarafına (tarayıcıya) gönderilmez. Tarayıcıdan yapılan tüm yapay zeka ve analiz istekleri, güvenli sunucu proxy rotaları (`/api/*`) üzerinden geçirilerek filtrelenir.

### 2. Güvenli Veri Akışı
Endüstriyel sensörlerden veya PLC'lerden gelen veri akışları, yetkilendirme katmanları ile korunmaktadır. 
* Yetkisiz veri enjeksiyonlarını engellemek için tüm uç noktalar token tabanlı doğrulamaya tabidir.

### 3. Esnek Hata Yönetimi
* Uygulama başlatılırken gerekli API anahtarlarının mevcut olup olmadığı denetlenir. 
* Sistem çökmek yerine özellikleri zarif bir şekilde devre dışı bırakır ve arayüzde bilgilendirici uyarılar gösterir. Bu durum, sistem detaylarının ifşa edilmesini engeller.

---

## 🛡️ Güvenlik Açığı Bildirimi

PulseGuard kod tabanında tespit ettiğiniz olası bir güvenlik açığını lütfen **kamuya açık kanallarda paylaşmayınız.**

Güvenli bir yama süreci yürütmek adına:
1. Bulgularınızı ayrıntılı olarak güvenlik ekibimize iletin.
2. E-postanızda açığın detaylı açıklamasını ve varsa çalışan örnek kod parçalarını paylaşın.
3. Raporunuzu aldıktan sonra en kısa sürede size dönüş yapacak ve gerekli düzeltmeleri yayınlayacağız.
