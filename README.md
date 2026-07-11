# PulseGuard — Endüstriyel IoT ve Gerçek Zamanlı Makine İzleme Platformu

**PulseGuard**, modern üretim tesisleri ve akıllı fabrikalar için tasarlanmış **yeni nesil bir endüstriyel izleme ve kestirimci bakım platformudur**. Platform; makine titreşim, sıcaklık ve enerji verilerini gerçek zamanlı olarak izler, AI destekli "Machine Health Engine" ile olası arızaları önceden tahmin eder ve arıza durumunda teknik operasyon ekiplerini proaktif olarak uyarır.

PulseGuard, fabrika mühendislerinin ve bakım ekiplerinin üretim hattındaki verimliliği maksimize etmesini ve plansız duruş sürelerini (downtime) minimuma indirmesini sağlar.

---

## 📸 Dashboard Genel Bakış

*PulseGuard'ın endüstriyel kontrol paneli; gerçek zamanlı sensör verilerini, makine sağlık skorlarını, anomali ısı haritalarını ve yapay zeka destekli operasyonel tahminleri tek bir merkezden sunar.*

---

## ⚡ Temel Özellikler

PulseGuard'ın sunduğu temel yetenekler:

1. **🏭 Fabrika Command Center (3D Makine Görselleştirme):**
   * Üretim hattındaki tüm makinelerin çalışma durumunu ve konumunu 3D modeller veya interaktif flowchartlar üzerinde anlık olarak izleyin.
   * Kritik uyarıları doğrudan 3D görselleştirme üzerinden takip edin.

2. **📊 Gerçek Zamanlı Sensör İzleme (Titreşim, Sıcaklık, Güç):**
   * Makinelerden gelen yüksek frekanslı sensör verilerini (vibrasyon, sıcaklık, gürültü seviyesi, enerji tüketimi) gerçek zamanlı şelale grafikleri ve zaman serisi çizelgeleri ile takip edin.

3. **🧠 Machine Health Engine (AI Destekli Anomali Tespiti):**
   * **Tahminleyici Bakım (Predictive Maintenance):** Sıcaklık, titreşim ve güç tüketim verilerini sürekli izleyerek, makine arıza belirtilerini henüz gerçekleşmeden tespit eden AI ajanları.
   * **Anomali Skoru:** Makinelerinizin "sağlık skorunu" anlık olarak hesaplar; normal çalışma dışındaki sapmaları anında raporlar.

4. **🛡️ Operasyonel Karar Destek ve FDIR:**
   * **Arıza Köken Analizi:** Bir arıza durumunda sistem, arızanın olası kökenini (Fault Detection, Isolation, and Recovery - FDIR) analiz ederek mühendislerin hızlı müdahale etmesini sağlar.
   * **Teknik Dokümantasyon RAG:** Bakım el kitaplarını sisteme yükleyerek, bir hata anında teknik ekiplere en uygun çözüm adımlarını sunan yapay zeka asistanı.

---

## 🏗️ Sistem Mimarisi

PulseGuard, yüksek performanslı bir veri işleme motoru üzerine kurulmuştur:

```
[ Endüstriyel Sensörler / PLC ] ──> [ Express.js API Sunucusu ] ──> [ Server-Sent Events (SSE) ] ──> [ React UI ]
                                          │
                      ┌───────────────────┴───────────────────┐
                      ▼ (Analiz Motoru)                       ▼ (Karar Çekirdeği)
            [ Machine Health Engine ]               [ FDIR Operasyonel Karar Ağaçları ]
      - titreşim_analizörü.py (RF/Titreşim ML)        - Gerçek Zamanlı Arıza Tespit Mantığı
      - enerji_tüketim_analizörü.py (SCADA/Modbus)
```

---

## 🚀 Kurulum ve Başlatma

### 📋 Ön Gereksinimler
* **Node.js:** `v18+` (`v20+` önerilir)
* **Python:** `v3.10+` (Analiz motorlarını çalıştırmak için)

### Adım Adım Kurulum

1. **Projeyi Klonlayın ve Dizine Girin**
   ```bash
   git clone <depo_adresi>
   cd pulseguard
   ```

2. **Bağımlılıkları Yükleyin**
   ```bash
   npm install
   ```

3. **Çevre Değişkenlerini Yapılandırın**
   `.env.example` dosyasını `.env` olarak kopyalayın ve gerekli API anahtarlarını yapılandırın:
   ```bash
   cp .env.example .env
   ```

4. **Uygulamayı Başlatın**
   ```bash
   npm run dev
   ```
   Tarayıcınızdan **[http://localhost:3000](http://localhost:3000)** adresine gidin.

---

## ⚠️ Yasal Uyarı
PulseGuard endüstriyel operasyonları optimize etmek için tasarlanmış bir izleme platformudur. Kritik altyapıların yönetimi, kullanıcının yerel endüstriyel güvenlik yönetmeliklerine ve iş güvenliği kurallarına uyumuna bağlıdır.
