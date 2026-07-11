# PulseGuard

PulseGuard, endüstriyel tesisler için gerçek zamanlı makine telemetri ve izleme platformudur. Üretim hattındaki sensör verilerini (sıcaklık, titreşim, güç) görselleştirir ve temel anomali tespiti sağlar.

## Özellikler

- **Canlı Sensör İzleme:** Sıcaklık, titreşim ve güç verilerinin gerçek zamanlı takibi.
- **Anomali Tespiti:** Sensör verilerindeki sapmaları yakalayan temel tespit motoru.
- **Endüstriyel Dashboard:** Makine sağlık skorları ve operasyonel veriler için özelleştirilebilir arayüz.

## Kurulum

### Ön Gereksinimler
* Node.js v18+
* Python v3.10+ (analiz motorları için)

### Başlatma
1. `npm install` ile bağımlılıkları yükleyin.
2. `.env.example` dosyasını `.env` olarak kopyalayın ve gerekli yapılandırmaları yapın.
3. `npm run dev` ile uygulamayı başlatın.
