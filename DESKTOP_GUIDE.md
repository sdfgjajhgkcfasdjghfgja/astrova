# 🖥️ PulseGuard — Masaüstü Uygulaması Çalıştırma ve Paketleme Rehberi

PulseGuard, üretim tesislerindeki yerel ağlara, PLC'lere veya doğrudan makine sensörlerine (USB üzerinden veya endüstriyel ağlar üzerinden) bağlanması gereken senaryolar için Electron entegrasyonu ile yerel bir masaüstü uygulaması olarak çalıştırılabilir. Bu sayede, tarayıcı pencerelerinden bağımsız olarak, izole bir masaüstü terminali gibi kullanılabilir.

Bu kılavuz, projenin masaüstü sürümünün geliştirme modunda nasıl çalıştırılacağını ve paketleneceğini (.exe, .dmg, .AppImage) açıklar.

---

## ⚡ Hızlı Yerel Başlatma

Uygulamayı yerel tarayıcınızda anında çalıştırmak isterseniz:

```bash
npm run dev
```

Ardından tarayıcınızda `http://localhost:3000` adresine giderek sistemi test edebilirsiniz.

---

## 🚀 Masaüstü Uygulamasını Geliştirme Modunda Çalıştırma

### 1. Geliştirme Modunda Başlatma
Projeyi yerel bir masaüstü penceresinde çalıştırmak için:
```bash
npm run electron:dev
```
*Bu komut, arka planda Express API sunucusunu ve Vite React arayüzünü ayağa kaldırır, portun hazır olmasını bekler ve Electron penceresini otomatik olarak açar.*

### 2. Derleme (Build) ve Paketleme (Packaging)
Uygulamayı tek bir çalıştırılabilir dosya haline getirmek için:
```bash
npm run electron:package
```
*Derleme tamamlandığında, projenin ana dizininde **`/dist-desktop`** adında bir klasör oluşacaktır.*

---

## 🔧 Masaüstü Entegrasyon Mimarisi

PulseGuard'ın masaüstü sürümü, kararlı ve kaynak dostu bir işlem yönetim mimarisi üzerine inşa edilmiştir:

1. **Ana İşlem (Electron Main Process):** `packages/electron/main.cjs` dosyası, işletim sistemi seviyesindeki işlemleri yönetir. Masaüstü uygulaması açıldığında, arka planda Express sunucusunu (`server.cjs`) alt işlem (child process) olarak ayağa kaldırır.
2. **Görsel Arayüz (Renderer Process):** React ve Vite ile güçlendirilmiş kullanıcı arayüzü, yerel alt sunucuyla haberleşir.
3. **Güvenli ve Otomatik Kapanış:** Kullanıcı masaüstü penceresini kapattığı anda, arka planda çalışan Express sunucusu ve simülatör süreçleri otomatik olarak sonlandırılır.

---

## 🏗️ Gelecek Yol Haritası

* **Endüstriyel Protokol Entegrasyonu:** Masaüstü ortamında doğrudan PLC'lere (MODBUS/TCP, OPC-UA) bağlanarak gerçek zamanlı fabrika verilerini izleme yetenekleri.
* **Çevrimdışı Yapay Zeka:** Fabrika sahalarında internet erişiminin kısıtlı olduğu durumlar için, tamamen çevrimdışı çalışabilen yerel AI modelleriyle telemetri analizi.
