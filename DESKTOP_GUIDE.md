# 🖥️ Astrova — Masaüstü Uygulaması Çalıştırma ve Paketleme Rehberi

Astrova, yerel yer istasyonu gereksinimlerine ve masaüstü kullanım senaryolarına yönelik olarak **Electron** entegrasyonu ile yerel bir masaüstü uygulaması olarak çalıştırılabilecek şekilde yapılandırılmıştır. Bu sayede, tarayıcı pencerelerinden bağımsız olarak, yerel donanım bağlantılarına (örn: USB üzerinden SDR çipleri veya seri port üzerinden rotatör bağlantıları) hazır, izole bir masaüstü terminali gibi kullanılabilir.

Bu kılavuz, projenin masaüstü sürümünün geliştirme modunda nasıl çalıştırılacağını, paketleneceğini (.exe, .dmg, .AppImage) ve yerel mimarinin arka planda nasıl çalıştığını açıklar.

---

## ⚡ Hızlı Yerel Başlatma

Uygulamayı yerel tarayıcınızda veya Docker ortamında anında çalıştırmak isterseniz:

```bash
# Geliştirme sunucusunu ve simülasyonları başlatır
npm run dev
```

Ardından tarayıcınızda `http://localhost:3000` adresine giderek sistemi test edebilirsiniz. Docker kullanan ekipler için:

```bash
# Docker üzerinde izole sandbox ortamını başlatır
docker compose up --build
```

---

## 🚀 Masaüstü Uygulamasını Geliştirme Modunda Çalıştırma

Gerekli tüm kütüphaneler (`electron`, `electron-builder`, `wait-on`, `concurrently`) projeye eklenmiştir. Projeyi yerel bir masaüstü penceresinde çalıştırmak için aşağıdaki adımları izleyin:

### 1. Geliştirme Modunda Başlatma (Dev Mode)
Tarayıcıya ihtiyaç duymadan, yerel kod değişikliklerinizi anında masaüstü penceresinde görmek için şu komutu çalıştırın:
```bash
npm run electron:dev
```
*Bu komut, arka planda Express API sunucusunu ve Vite React arayüzünü ayağa kaldırır, portun hazır olmasını bekler ve Electron penceresini otomatik olarak açarak içerik akışını yönlendirir.*

### 2. Derleme (Build) ve Paketleme (Packaging)
Uygulamayı tek bir çalıştırılabilir dosya haline getirip yerel ağınızda veya GitHub Releases sekmesinde paylaşmak üzere paketlemek için:

```bash
# Windows (.portable exe), macOS (.dmg) veya Linux (.AppImage) olarak derler
npm run electron:package
```
*Derleme tamamlandığında, projenizin ana dizininde **`/dist-desktop`** adında bir klasör oluşacaktır. Bu klasör altında işletim sisteminize uygun taşınabilir (portable) veya yükleyici dosyasını bulabilirsiniz.*

---

## 🔧 Masaüstü Entegrasyon Mimarisi

Astrova'nın masaüstü sürümü, kararlı ve kaynak dostu bir işlem yönetim mimarisi üzerine inşa edilmiştir:

1. **Ana İşlem (Electron Main Process):** `packages/electron/main.cjs` dosyası, işletim sistemi seviyesindeki işlemleri yönetir. Masaüstü uygulaması açıldığında, arka planda saniyede binlerce telemetri paketini işleyebilen Express sinyal akış sunucusunu (`server.cjs`) alt işlem (child process) olarak ayağa kaldırır.
2. **Görsel Arayüz (Renderer Process):** React ve Vite ile güçlendirilmiş kullanıcı arayüzü, yerel alt sunucuyla IPC (Inter-Process Communication) veya yerel REST uç noktaları üzerinden haberleşir.
3. **Güvenli ve Otomatik Kapanış (Process Lifecycle):** Kullanıcı masaüstü penceresini kapattığı anda, arka planda çalışan Express sunucusu ve simülatör alt işlemleri otomatik olarak sonlandırılır. Bu sayede arka planda işlemci (CPU) ve RAM tüketen atıl süreçlerin kalması önlenir.

---

## 🛰️ Gelecek Yol Haritası ve Donanım Entegrasyonları

Astrova masaüstü sürümü, eğitim ve simülasyon sınırlarının ötesine geçerek gerçek yer istasyonu donanımlarıyla etkileşime girmek üzere tasarlanabilir:

* **SDR WebUSB ve Seri Port Entegrasyonu:** Masaüstü ortamında doğrudan RTL-SDR, HackRF veya Arduino tabanlı anten rotatörlerine (Rotator Controller) bağlanarak gerçek anten yönlendirme ve frekans takip sistemlerinin eğitici prototipleri yapılabilir.
* **Çevrimdışı Yapay Zeka (Local LLM / Ollama):** Gemini API'sinin yanı sıra, masaüstünde tamamen çevrimdışı ve gizli çalışması gereken laboratuvarlar için Ollama üzerinden yerel Llama/Mistral modelleriyle telemetri ve anomali analiz raporlama desteği entegre edilebilir.
