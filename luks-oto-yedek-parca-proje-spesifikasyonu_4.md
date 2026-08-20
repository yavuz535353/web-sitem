# ERLER OTO — LÜKS YEDEK PARÇA E-TİCARET PLATFORMU
## Proje Spesifikasyonu & Bileşen Mimarisi

**Versiyon:** 3.0
**Durum:** Geliştirmeye Hazır MVP Tanımı
**Hedef Kitle:** Ürün, tasarım ve geliştirme ekibi

> **Güvenlik:** API anahtarları bu dokümana, Git geçmişine veya istemci tarafı koda yazılmamalıdır. Daha önce paylaşılmış anahtar iptal edilmeli ve yenisi yalnızca sunucu ortam değişkeni olarak tanımlanmalıdır.

---

## 0. KURUMSAL KİMLİK VE TEMA (BRANDING)

- **Marka Adı:** Erler Oto
- **Logo:** Kırmızı bayrak zemin üzerinde beyaz "E" harfi
- **Tema Yönü:** Logodaki kırmızı/beyaz kontrastı temel alan, lüks segment araçları (Porsche, Maserati, Ferrari vb.) öne çıkaracak **koyu (dark) zeminli premium tema**
- **Tipografi:** Keskin hatlı, minimalist/brutalist ağırlıklı başlık fontları; gövde metinlerinde okunabilirliği önceleyen daha ince bir karşıt font

### 0.1 Renk Token Önerisi

| Token | Kullanım | Not |
|---|---|---|
| `--color-bg-base` | Ana zemin | Koyu antrasit/siyah (`#0A0A0B` civarı) |
| `--color-accent-primary` | Logo kırmızısı | CTA butonları, aktif filtre, rozetler |
| `--color-accent-secondary` | Logo beyazı | Başlıklar, ikon çizgileri, ayraçlar |
| `--color-surface` | Kart/panel zemini | Ana zeminden bir ton açık koyu gri |
| `--color-brand-luxury` | Marka bazlı vurgu (opsiyonel) | Porsche/Maserati kart arka planlarında ince ton farkı |

**Uygulama Notu:** Logo (beyaz E + kırmızı bayrak) header'da sol üstte sabit; hero banner'daki animasyon geçişlerinde kırmızı vurgu rengi CTA ve OEM arama kutusu odak durumunda kullanılmalı — marka kimliği yalnızca logoda değil, etkileşimli ögelerde de hissedilmeli.

---

## 1. GENEL BAKIŞ VE AMAÇ

Mevcut fiziksel yedek parça satış operasyonunu, akıcı animasyonlu, modern sayfa geçişlerine sahip, yüksek kaliteli görsellerle desteklenmiş ve **üst segment lüks araç markalarına** odaklanmış bir dijital e-ticaret platformuna taşımak.

Sistem sıradan bir "yedek parça listeleme sitesi" değil; deneyim odaklı, prestij hissi veren bir alışveriş platformu olarak konumlandırılacaktır.

---

## 2. REFERANS SİTE ANALİZİ

Yüklenen 4 örnek site incelendi. Aşağıda her birinden platforma taşınacak **yapısal/UX desenleri** özetlenmiştir (içerik değil, mimari desenler):

| Referans | Öne Çıkan Desen | Projeye Adaptasyonu |
|---|---|---|
| **Teile.com** (Porsche parçaları) | Büyük, siyah zeminli ürün grubu banner'ları; model bazlı yıl aralıklı listeleme (911: 1964-1989, 964, 993...); güven rozetleri (satılan parça sayısı, deneyim yılı, teslimat oranı) sayaç/istatistik bloğu olarak ana sayfada; 25+ ülke için ayrı dil/bölge linkleri | Hero altında "Güven Rozetleri" istatistik şeridi; Model Yılı Seçici bileşeni; i18n alt yapısı için bölge/dil route yapısı |
| **Porscheparcam.com** | Üstte arama çubuğu + hızlı marka/model kartları (araç silüeti + "Alışverişe Başla" CTA); "Size Özel Ürünler" ve "İndirimdeki Ürünler" yatay kaydırmalı kart rayı; indirim yüzdesi rozetleri | Model Seçici Kart Grid'i; Yatay Ürün Karuseli bileşeni; İndirim Rozeti (badge) bileşeni |
| **Otoparcasan.com** | Sekmeli araç seçim paneli (Garaj / Araç / Şasi / Aracım); kategori kartları ikon + alt ürün etiketleri şeklinde gruplu; şasi numarasıyla parça sorgulama vurgusu; büyük marka/model index tablosu (footer) | OEM/Şasi Arama sekmeli bileşeni; Kategori Kartı (ikon + mini ürün listesi) bileşeni |
| **Otosupermarket.com** | Video/kampanya banner slider; "Araca Göre Parça Arama" — Marka > Model > Kategori kademeli seçim; ürün kartlarında çifte fiyat (indirimli/orijinal) ve yüzde rozeti; marka logosu grid'i | Kademeli Araç Filtresi (dependent dropdown) bileşeni; Fiyat Bloğu (çizili eski fiyat + indirimli fiyat) bileşeni |

**Ortak Çıkarım:** Tüm referanslarda temel dönüşüm ögesi **"araca göre parça bulma"** akışıdır (şasi no / marka-model-yıl / OEM kodu). Bu, platformun ana sayfa hero alanının merkezinde olmalıdır.

---

## 3. GÖRSEL VE MEDYA ÜRETİM SİSTEMİ

- **Altyapı:** Fal.ai API entegrasyonu
- **Model:** Nanobana 2 (FLUX / Nano Banana 2)
- **Kapsam:** Banner, kategori ve konsept görselleri
- **Standart:** Otomotiv sektörüne uygun, yüksek çözünürlüklü, ürünle doğrudan alakalı
- **Kapsam Dışı:** Blog/makale görselleri üretilmeyecek — sistem yalnızca e-ticaret görselleri üretecek şekilde kısıtlanacak

**Uygulama Notu:** Görsel üretim prompt şablonları, marka bazlı (Porsche kırmızı/siyah stüdyo estetiği, Maserati krom/lacivert vb.) ön tanımlı stil paketleri olarak tutulmalı; her görsel isteğinde marka + parça tipi + kompozisyon stili parametre olarak geçirilmeli.

---

## 4. ODAKLANILAN LÜKS ARAÇ KATALOĞU

**Öncelikli Yüksek Satış Grubu:** Porsche, Maserati
**Diğer Odak Markalar:** Bentley, Ferrari, Lamborghini, Aston Martin, Tesla, Alfa Romeo

*(Not: Tüm otomobil markaları kapsam dışıdır — sadece yukarıdaki üst segment gruplar listelenecek.)*

### 4.1 Kategori & Filtreleme Mimarisi

1. **OEM / Şase Arama Motoru** — Şase numarası veya OEM parça kodu ile doğrudan arama
2. **Gelişmiş Araç Seçici** — Model → Yıl → Motor Tipi kademeli filtreleme
3. **Ödeme Altyapısı** — Şimdilik esnek bırakılacak; sanal pos/ödeme sağlayıcı kararı sonraya ertelendi (mimari, ödeme sağlayıcısını sonradan takılabilir bir modül olarak öngörmeli)

### 4.2 MVP Kapsamı

İlk sürüm aşağıdaki akışı eksiksiz ve üretimde kullanılabilir şekilde sunacaktır:

1. Kullanıcı dil seçer ve marka/model/yıl/motor bilgisiyle araç seçer.
2. Kullanıcı OEM kodu veya şasi numarasıyla arama yapar.
3. Sistem yalnızca uyumlu ve satışa açık ürünleri listeler.
4. Kullanıcı ürün detayında OEM kodunu, uyumluluk bilgisini, stok durumunu ve teslimat tahminini görür.
5. Kullanıcı ürünü sepete ekler, adres bilgilerini girer ve ödeme sağlayıcısına yönlendirilir.
6. Başarılı ödeme sonrası sipariş oluşturulur ve kullanıcıya sipariş özeti gösterilir.

**MVP dışında:** Blog, sadakat programı, gelişmiş kampanya motoru, bayi paneli, mobil uygulama, otomatik görsel üretim yönetim paneli ve kapsam dışı araç markaları.

### 4.3 Kabul Kriterleri

- Desteklenen her dilde ana sayfa, katalog, ürün detay, sepet ve checkout sayfaları çalışır.
- Geçersiz veya eksik araç seçimlerinde kullanıcıya alan bazlı hata mesajı gösterilir.
- OEM kodu ve şasi aramaları sonuç bulunamadığında boş durum ekranı gösterir; sistem hata vermez.
- Katalog filtreleri URL ile paylaşılabilir ve tarayıcı yenilendiğinde korunur.
- Stokta olmayan ürün sepete eklenemez.
- Fiyat, stok ve uyumluluk bilgisi istemci girdisine güvenmeden sunucu tarafında doğrulanır.
- Ödeme sonucu yalnızca sağlayıcı webhook doğrulamasından sonra sipariş durumuna yansıtılır.
- API anahtarları ve ödeme bilgileri istemciye gönderilmez; üretim loglarında maskelenir.
- Mobil (375 px) ve masaüstü (1440 px) ekranlarda yatay taşma olmadan kullanılabilir.

---

## 5. BİLEŞEN MİMARİSİ (FRONTEND)

```
src/
├── app/
│   ├── [locale]/                     # i18n route grubu (tr, en, de, zh)
│   │   ├── page.tsx                  # Ana Sayfa
│   │   ├── katalog/[...filters]/     # Katalog & Listeleme
│   │   ├── urun/[slug]/              # Ürün Detay
│   │   ├── sepet/
│   │   └── checkout/
├── components/
│   ├── layout/
│   │   ├── Header/ (Logo, DilSecici, AramaCubugu, SepetIkonu)
│   │   └── Footer/ (Marka Index, Bülten, İletişim)
│   ├── home/
│   │   ├── HeroBanner/               # Animasyonlu hero + OEM arama
│   │   ├── OemSasiAramaMotoru/       # Şase/OEM kod arama sekmesi
│   │   ├── AracSeciciPaneli/         # Marka > Model > Yıl > Motor kademeli
│   │   ├── MarkaKategoriKartlari/    # Porsche/Maserati/Ferrari... kartları
│   │   ├── GuvenRozetleriSeridi/     # İstatistik sayaçları (sayı animasyonlu)
│   │   └── OneCikanUrunlerKaruseli/
│   ├── katalog/
│   │   ├── FiltrelemePaneli/         # Fiyat, Marka, Stok, Parça Tipi
│   │   ├── UrunKarti/                # Görsel, OEM kod, fiyat bloğu, rozet
│   │   └── SiralamaSecici/
│   ├── urun-detay/
│   │   ├── GorselGalerisi/
│   │   ├── OemKoduBadge/
│   │   ├── ParcaUyumTablosu/         # Model/Yıl uyumluluk matrisi
│   │   └── SepeteEkle/
│   ├── sepet-checkout/
│   │   ├── SepetOzeti/
│   │   ├── AdresFormu/
│   │   └── OdemeAdimlari/           # Ödeme sağlayıcısı sonradan takılabilir
│   └── shared/
│       ├── FiyatBlogu/              # Eski fiyat (çizili) + yeni fiyat + %rozet
│       ├── DilSecici/               # TR/EN/DE/ZH
│       ├── SayfaGecisSarmalayici/   # Page transition wrapper
│       └── LoadingSkeleton/
├── lib/
│   ├── i18n/                        # next-intl veya benzeri
│   ├── fal-ai/                      # Görsel üretim servis katmanı
│   └── oem-arama/                   # Şase/OEM sorgu servisi
└── styles/
    └── animasyonlar/                # Framer Motion / GSAP geçiş tanımları
```

### 5.1 Uygulama Sınırları

- Sunucu bileşenleri ürün, stok, fiyat ve sipariş verisini doğrudan istemciye açmadan sağlayacaktır.
- Sepet sunucu tarafında doğrulanacak; istemciden gelen fiyat veya indirim tutarı kabul edilmeyecektir.
- OEM/şasi sorgusu, veri kaynağı adapter arayüzü arkasında tutulacaktır. İlk adapter mock veriyle başlayabilir.
- Ödeme sağlayıcısı `PaymentProvider` benzeri bir arayüzle değiştirilebilir olacaktır.
- Fal.ai yalnızca sunucu tarafında çağrılacak; görsel üretimi kullanıcı isteğiyle değil, yetkili operasyon akışıyla tetiklenecektir.
- Görseller CDN veya obje depolama üzerinden servis edilecek; API yanıtları doğrudan tarayıcıya aktarılmayacaktır.

### 5.2 Önerilen Teknoloji Yığını

- **Framework:** Next.js (App Router) — SSR/SEO avantajı, i18n route desteği
- **Stil:** Tailwind CSS + tasarım token sistemi (marka bazlı renk paletleri)
- **Animasyon:** Framer Motion (sayfa geçişleri, hover efektleri, sayaç animasyonları)
- **State/Sepet:** Zustand veya Redux Toolkit
- **i18n:** next-intl (TR, EN, DE, ZH çeviri anahtarları JSON bazlı)
- **Görsel Üretim:** Fal.ai API (Nanobana 2 modeli) — build-time veya admin panelden tetiklenen içerik üretim pipeline'ı

---

## 6. ÇOKLU DİL DESTEĞİ (i18n)

**Desteklenen Diller:** Türkçe, İngilizce, Almanca, Çince

**Kapsam:** Arayüz metinleri, ürün açıklamaları, filtreleme seçenekleri, ödeme adımları — sitenin tamamı.

**Mimari Öneri:** Locale-prefix route yapısı (`/tr`, `/en`, `/de`, `/zh`), çeviri anahtarları merkezi JSON dosyalarında, ürün açıklamaları veritabanında dil bazlı kolonlar veya ayrı çeviri tablosu ile tutulmalı.

---

## 7. SİTE SAYFA YAPISI

| Sayfa | İçerik |
|---|---|
| **Ana Sayfa** | Animasyonlu Hero Banner, Hızlı Araç & OEM Seçici, Lüks Marka/Kategori Kartları, Güven Rozetleri |
| **Ürün Detay** | Yüksek çözünürlüklü görseller, OEM Kodu, Parça Uyum Tablosu |
| **Katalog & Listeleme** | Gelişmiş filtreleme paneli (Fiyat, Marka, Stok Durumu, Parça Tipi) |
| **Sepet & Checkout** | Akıcı, güvenli, modern sipariş adımları |

*(Not: Blog sayfaları kapsam dışıdır — sistem doğrudan e-ticaret odaklıdır.)*

---

## 8. GİTHUB VE PROJE YÖNETİMİ

- Geliştirme tamamlandığında proje, belirtilecek yeni GitHub branch'ine yüklenecek
- Geliştirme sürecinde mevcut MR (Merge Request / System Prompt) dosyaları ve talimatları takip edilerek ilerlenecek

### 8.1 Ortam Değişkenleri

Geliştirme ve üretim ortamında en az aşağıdaki değişkenler kullanılmalıdır. `.env*` dosyaları Git'e eklenmemelidir.

```text
FAL_KEY=
PAYMENT_PROVIDER=
PAYMENT_SECRET_KEY=
DATABASE_URL=
NEXT_PUBLIC_SITE_URL=
```

Anahtar rotasyonu, erişim yetkileri, log maskeleme ve üretim ortamı secret yönetimi geliştirme tamamlanmadan doğrulanmalıdır.

---

## 9. UYGULAMA SIRASI

1. Proje iskeleti, tasarım tokenları, route yapısı ve i18n kurulumu.
2. Ürün, araç uyumluluğu, stok ve sipariş veri modelleri.
3. Araç seçici, OEM/şasi arama ve katalog filtreleri.
4. Ürün detay, sepet ve ödeme adapter'ı.
5. Yönetimli görsel üretim akışı ve CDN depolama.
6. Erişilebilirlik, güvenlik, SEO, performans ve uçtan uca testler.
7. Staging kabulü, veri aktarımı, secret rotasyonu ve üretim yayını.

## 10. GEREKLİ DIŞ BAĞIMLILIKLAR

- Ödeme sağlayıcısı ve webhook dokümantasyonu
- Ürün/stok/OEM uyumluluk veri kaynağı ve veri aktarım formatı
- Çeviri sahibi ve içerik onay süreci
- Görsel depolama/CDN sağlayıcısı
- GitHub repository, branch stratejisi ve deployment ortamı

Bu bağımlılıklar sağlanana kadar ödeme, canlı katalog ve üretim görsel üretimi staging adapter'larıyla çalıştırılmalıdır.

---

*Bu doküman, sağlanan 4 referans sitenin (Teile.com, Porscheparcam.com, Otoparcasan.com, Otosupermarket.com) yapısal analizine, Erler Oto marka kimliğine ve orijinal proje promptuna dayanılarak hazırlanmıştır.*