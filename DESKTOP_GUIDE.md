# 🖥️ Astrova - Masaüstü Uygulaması Rehberi & GitHub Popülerlik Kılavuzu

Tebrikler! **Astrova**, harika siber-punk görsel dili (cyberpunk aesthetic), gerçek zamanlı şelale (waterfall) spektrogram akışı ve Gemini AI destekli akıllı sinyal analiz yetenekleriyle klasik web uygulamalarının ötesine geçerek **müthiş bir masaüstü uygulamasına** dönüştü.

### ⚡ Hızlı Deneme Sürümü (Try the Product)
Eğer uygulamayı yerel web tarayıcınızda anında denemek isterseniz:
```bash
# Geliştirme sunucusunu ve simülasyonları başlatır
npm run demo
```
Ardından tarayıcınızda `http://localhost:3000` adresine giderek sistemi test edebilirsiniz! Ayrıca Docker kullanan ekipler için:
```bash
# Docker üzerinde izole sandbox başlatma
docker compose up --build
```

---

Bu kılavuzda, projeyi kendi bilgisayarınızda nasıl masaüstü uygulaması olarak çalıştıracağınızı, paketleyeceğinizi (.exe, .dmg, .AppImage) ve GitHub üzerinde nasıl paylaşıp popüler hale getirebileceğinizi adım adım bulabilirsiniz.

---

## 🌟 GitHub'da Paylaşırsam Popüler Olur mu?

**KESİNLİKLE EVET!** GitHub topluluğu (özellikle r/cyberpunk, r/selfhosted, r/SDR, ve genel geliştiriciler) bu tür yüksek kaliteli görsel tasarıma sahip olan, gerçekmiş hissi uyandıran simülasyon ve analiz araçlarına bayılır. Astrova'nın popüler olmasını sağlayacak kilit faktörler şunlardır:

1. **Eşsiz Görsel Dil (Aesthetic):** Mat antrasit arka plan, neon camgöbeği sinyal dalgası ve asimetrik veri hatları bilimsel laboratuvar/askeri radar ekranı havası veriyor.
2. **Gerçek Zamanlı Spektrogram (Waterfall):** Akıcı, zaman serisi şelale akışı veri yoğunluğunu mükemmel hissettiriyor. İnsanlar ekran kaydı alıp GIF/video paylaştığında anında dikkat çekecektir.
3. **Akıllı Sinyal Analizi (Gemini AI):** Keşfedilen anormalliklerin frekansını analiz edip "Bu sinyal bir meteoroloji uydusundan geliyor olabilir" gibi teknik ve taktik raporlar sunması projeye yapay zekanın en yaratıcı uygulamasını katıyor.
4. **Masaüstü Entegrasyonu (Electron):** Artık sadece tarayıcıda çalışan bir sayfa değil; kendi penceresi, özel siber ping ses efektleri ve döküm alma (CSV/JSON) butonlarıyla tamamen bağımsız bir terminal!

---

## 🚀 Masaüstü Uygulaması Olarak Çalıştırma

Gerekli tüm kütüphaneler (`electron`, `electron-builder`, `wait-on`, `concurrently`) projeye eklenmiştir. Projeyi masaüstü penceresinde çalıştırmak için aşağıdaki adımları izleyin:

### 1. Geliştirme Modunda Başlatma (Dev Mode)
Tarayıcıyı açmadan, yerel kod değişikliklerinizi anında masaüstü penceresinde görmek için şu komutu çalıştırın:
```bash
npm run electron:dev
```
*Bu komut, arka planda hem Express sunucusunu hem de Vite arayüzünü ayağa kaldırır, portun hazır olmasını bekler ve Electron penceresini otomatik olarak açar.*

### 2. Üretim Sürümü (Build) ve Paketleme (Packaging)
Uygulamayı tek bir çalıştırılabilir dosya haline getirip arkadaşlarınıza göndermek veya GitHub Releases kısmında paylaşmak için:

```bash
# Windows (.portable exe), macOS (.dmg) veya Linux (.AppImage) olarak derler
npm run electron:package
```
*Derleme tamamlandığında, projenizin ana dizininde **`/dist-desktop`** adında bir klasör oluşacaktır. İçinde işletim sisteminize uygun kuruluma hazır taşınabilir (portable) veya yükleyici dosyasını bulabilirsiniz!*

---

## 🔧 Masaüstü Mimarisi Nasıl Çalışıyor?

Arka planda inanılmaz stabil bir mimari kurulmuştur:
* **Ana İşlem (Electron Main Process):** `electron/main.cjs` dosyası, işletim sistemiyle konuşur. Uygulama açıldığında saniyeler içinde arka planda saniyede binlerce örnek işleyebilen Express sinyal akış sunucusunu (`server.cjs`) alt işlem (child process) olarak ayağa kaldırır.
* **Görsel Arayüz (Renderer Process):** React ve Vite ile güçlendirilmiş siber arayüz, arka planda çalışan bu yerel sunucuyla haberleşir.
* **Mükemmel Kapanış (Auto-Clean):** Masaüstü penceresini kapattığınız anda arka plandaki sinyal sunucusu da otomatik olarak sonlandırılır, bilgisayarınızda gereksiz RAM/CPU harcanması engellenir.

---

## 📈 GitHub Yıldızlarını (Stars) Toplamak İçin Öneriler

Projeyi GitHub'da paylaştığınızda yüzlerce yıldız almak için şu taktikleri uygulayabilirsiniz:

1. **Göz Alıcı Bir README.md Hazırlayın:**
   * Projenin en üstüne spektrogram akışını ve alarm sesleri çaldığı o anı gösteren **yüksek kaliteli bir GIF veya kısa video** koyun. Görsellik GitHub'da her şeydir!
2. **"Donanım Desteği" İpucu Ekleyin (WebUSB / RTL-SDR):**
   * README dosyasında *"Gelecekte WebUSB API kullanılarak gerçek RTL-SDR donanımlarına (radyo anteni çipleri) doğrudan masaüstünden bağlanma desteği eklenecektir"* diye bir yol haritası (roadmap) belirtin. SDR topluluğu projeye akın edecektir!
3. **Product Hunt ve Reddit Paylaşımları:**
   * Projeyi tamamladıktan sonra r/cyberpunk, r/selfhosted ve r/SDR sub-redditlerinde "Yapay zeka analizli siber-punk radyo izleyici terminali yaptım" başlığıyla paylaşın.

Astrova, şu haliyle bile hem mühendislik hem de tasarım olarak sınıfının en yaratıcı ve estetik işlerinden biri. Masaüstünüzde komutları çalıştırıp tadını çıkarın! 🛸🛰️
