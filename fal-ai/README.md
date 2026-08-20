# Fal.ai medya entegrasyonu

Bu entegrasyon yalnızca sunucu tarafında çalışmalıdır. API anahtarı tarayıcı koduna, Git geçmişine veya HTML dosyalarına yazılmaz.

## Ortam değişkenleri

```text
FAL_KEY=rotated-secret-key
FAL_MODEL=fal-ai/flux/dev
```

`FAL_MODEL`, Fal.ai hesabında erişiminiz olan model kimliğiyle değiştirilmelidir. Daha önce paylaşılmış anahtar iptal edilip yenisi oluşturulmalıdır.

## Endpoint

`POST /api/generate-image`

```json
{
  "brand": "bentley",
  "part": "front air suspension kit",
  "composition": "product"
}
```

`composition` değerleri: `banner`, `product`, `category`.
