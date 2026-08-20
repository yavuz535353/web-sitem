$ErrorActionPreference = 'Stop'

Write-Host 'Erler Oto degisiklikleri GitHub''a gonderiliyor...' -ForegroundColor Cyan
git add .
git commit -m "Update approved vehicle media and catalog" 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host 'Yeni commit yok veya commit olusturulamadi.' -ForegroundColor Yellow
} else {
  git push
  Write-Host 'Tamamlandi. Vercel GitHub commit''ini otomatik deploy edecek.' -ForegroundColor Green
}
