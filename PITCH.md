# Astrova 🛰️ — Eğitim, Araştırma ve Yer İstasyonu Simülasyonu Değer Önerisi

> **Tek Cümlelik Değer Önerisi:** Astrova; uydu teknolojileri kulüpleri, akademik araştırma ekipleri ve sivil amatör radyo toplulukları için geliştirilmiş, gerçek zamanlı telemetri izleme, SDR spektrum analizi ve yapay zeka destekli operasyonel karar desteği sunan açık kaynaklı bir yer istasyonu eğitim ve simülasyon yazılımıdır.
> 
> *Astrova provides an interactive, educational environment for small-satellite research teams and RF enthusiasts to visualize orbital paths, monitor simulated multi-variate telemetry, and study signal analysis patterns in a safe laboratory setting.*

---

## 🎯 1. Operasyonel Değer Önerisi ve Problem Tanımı

Geleneksel uzay ve uydu eğitim programları, öğrencilere ve genç araştırmacılara genellikle karmaşık terminal kodları, ham CSV dosyaları veya pahalı tescilli yazılımlarla telemetri işlemeyi öğretir. Geliştirilen CubeSat veya yüksek irtifa balonu projelerinde, statik eşik değerleri (örn: *sıcaklık > 60°C ise alarm ver*) üzerinden basit kontroller yapılır. Ancak, gerçek dünyadaki karmaşık siber-fiziksel anomalileri (örneğin sinyal zayıflarken sıcaklığın hafifçe yükselmesi ve voltajın dalgalanması gibi çok değişkenli durumları) saptamak bu basit yöntemlerle zordur.

**Astrova**, öğrencilerin ve araştırmacıların yer istasyonu operasyonlarını uçtan uca öğrenmelerini sağlayan açık, modern ve kullanıcı dostu bir arayüzdür. Platform:
1. SGP4 tabanlı 3D yörünge izleme mantığını kavramayı sağlar.
2. Yazılım Tabanlı Radyo (SDR) üzerinden spektrum analizi ve şelale (waterfall) grafiklerinin okunmasını öğretir.
3. Çok değişkenli telemetri verilerinde standart sapma tabanlı anomali tespit yaklaşımlarını görselleştirir.
4. Gemini AI destekli operasyon asistanı ile teknik kılavuzları entegre ederek (RAG) anormalliklerin kök neden analizlerini simüle eder.

---

## 📊 2. Akademik Araştırma ve Simülasyon Senaryoları

Astrova, özellikle üniversite CubeSat takımları ve yüksek irtifa balonu (HAB) projeleri için güçlü bir simülasyon laboratuvarı görevi görür. Aşağıdaki akademik senaryolar için bir test ve doğrulama aracı olarak kullanılmaktadır:

* **🛰️ Akademik CubeSat ve HAB Entegrasyonu:**
  * **Istanbul Teknik Üniversitesi (İTÜ) USTEL ve Benzeri Öğrenci Kulüpleri:** Öğrencilerin kendi CubeSat telemetri veri şemalarını Astrova'ya entegre ederek, CCSDS paket formatlarını deşifre etme ve arayüz üzerinde görselleştirme yeteneklerini geliştirmeleri hedeflenir.
  * **Grizu-263 vb. PocketQube / CubeSat Ekipleri:** Tasarlanan uyduların güneş panelleri üzerindeki ısıl salınımları veya batarya gerilim düşümlerini çok değişkenli Z-Skoru algoritmalarıyla izleme simülasyonları gerçekleştirilir.
  * **Yüksek İrtifa Balonu (HAB) Telemetri Analizi:** Balon uçuşlarından elde edilen yükseklik, basınç, rüzgar hızı ve sıcaklık verilerinin Z-skoru tabanlı anomali algoritmaları ile gerçek zamanlı analiz edilmesi simüle edilir.
* **🌐 Açık Kaynaklı RF ve SDR Toplulukları:**
  * RTL-SDR veya HackRF donanımlarına sahip öğrenciler, sivil frekans bantlarındaki radyo sinyallerini tarayıp Astrova'nın şelale spektrogramı üzerinden sinyal kalitesini, parazit miktarını ve doppler kaymasını inceleyebilirler.

---

## 👥 3. Hedef Kullanıcı Profilleri

Astrova, küçük bütçelerle uzay sistemleri geliştiren ve eğitim veren üç ana kullanıcı grubunu hedefler:

### Profil A: Akademik CubeSat Takımları ve Üniversite Laboratuvarları
* **Kimler:** Üniversitelerin havacılık ve uzay mühendisliği bölümleri, öğrenci uydu kulüpleri ve akademik yer istasyonu ekipleri.
* **Problem:** Kendi imkanlarıyla geliştirdikleri CubeSat'ları izlemek için modern bir görsel arayüz yazmaya vakitleri veya bütçeleri yoktur. Eski, terminal tabanlı açık kaynak kodlu araçları kullanmak ise öğrencilerin öğrenme eğrisini zorlaştırır.
* **Çözüm:** Astrova, hazır ve modern bir yer istasyonu kontrol odası (MOC) arayüzü sunarak takımların kendi telemetri şemalarını saniyeler içinde görselleştirmesini ve eğitim materyali olarak kullanmasını sağlar.

### Profil B: NewSpace Girişimleri ve Ar-Ge Ekipleri (Erken Aşama)
* **Kimler:** Seed öncesi aşamada olan, mikrouydu takımları veya tarımsal gözlem/IoT projeleri için prototip geliştiren erken aşama teknoloji ekipleri.
* **Problem:** Büyük ölçekli yer kontrol yazılımlarına (örn: Kratos, L3Harris) yüz binlerce dolar ödeyecek bütçeleri yoktur. Kendi sistemlerini test edecek hızlı, hafif bir test odası simülatörüne ihtiyaç duyarlar.
* **Çözüm:** Astrova'nın hafif mimarisi ve yerel Python servisleri, bu ekiplerin donanım testlerini (hardware-in-the-loop) simüle etmelerine imkan tanır.

### Profil C: Amatör Telsizciler ve Uzay Meraklıları (RF Hobbyists)
* **Kimler:** NOAA hava durumu uydularını veya amatör telsiz uydularını RTL-SDR cihazlarıyla evlerinden takip eden hobiciler.
* **Problem:** Sinyal alımı sırasında spektrumu görselleştirmek ve veriyi anlamlandırmak için birden fazla kopuk yazılım (GQRX, SDR#, Excel) kullanmak zorunda kalırlar.
* **Çözüm:** Astrova, canlı spektrum takibini, yörünge koordinat hesaplarını ve sinyal analizini tek bir modern web terminalinde toplar.

---

## 📈 4. Simülasyon Tabanlı Operasyonel Analiz Modülü

Astrova, bir "Decacorn" girişim olma iddiası taşımayan, saf bir eğitim platformudur. Bu doğrultuda, sistem içindeki **"Finansal / Risk Analizi"** ekranı, öğrencilere bir uzay görevinin operasyonel maliyetlerini ve risk yönetimini öğretmek amacıyla kurgulanmış bir **eğitim simülatörüdür**:

* **Teorik ARR Modellemesi:** Projenin bir SaaS modeli olarak kurgulanması durumunda uydu başına maliyet analizi.
* **Risk Azaltma Modellemesi (Disaster Prevention):** Çok değişkenli anomali tespiti sayesinde zamanında müdahale edilen batarya patlaması, güneş paneli kilitlenmesi veya yörünge kayması gibi senaryoların, görev bütçesine (milyon dolarlık donanım kayıplarının önlenmesi) sağladığı teorik katkı simüle edilir.
* **Eğitim Odaklı Senaryo İstatistiği:** Öğrencilerin simüle edilmiş anomalileri ne kadar sürede tespit edip FDIR (Failure Detection, Isolation, and Recovery) aksiyonu aldıklarını ölçen reaksiyon analitiği.

---

## 🚀 5. Açık Kaynak Topluluk Geliştirme Yol Haritası

Açık kaynak ekosistemini güçlendirmek amacıyla projenin sivil topluluklarla entegrasyon hedefleri şunlardır:

1. **SatNOGS Entegrasyon Desteği:** Libre Space Foundation tarafından geliştirilen SatNOGS yer istasyonu ağının JSON veri formatları ile uyumluluk.
2. **GNU Radio Out-of-Tree Blokları (`gr-astrova`):** GNU Radio Companion üzerinden alınan ham sinyal peak'lerini doğrudan Astrova Express API'sine aktaran örnek akış şemalarının paylaşılması.
3. **Eğitim Müfredatı Entegrasyonu:** Lisans düzeyindeki uzay sistemleri tasarımı derslerinde, telemetri kodlama ve sinyal işleme konuları için pratik laboratuvar aracı olarak sunulması.
