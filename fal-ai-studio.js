const form = document.querySelector('#media-form');
const message = document.querySelector('#studio-message');
const result = document.querySelector('#generation-result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  message.textContent = 'Fal.ai üretimi başlatılıyor...';
  result.querySelector('.result-placeholder').textContent = 'Görsel hazırlanıyor...';

  try {
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const responseText = await response.text();
    let payload;
    try {
      payload = JSON.parse(responseText);
    } catch {
      payload = { error: 'Fal.ai sunucusu bağlı değil veya FAL_KEY yapılandırılmamış.' };
    }
    if (!response.ok) throw new Error(payload.error || 'Üretim başarısız.');
    const imageUrl = payload.result?.images?.[0]?.url;
    result.querySelector('.result-placeholder').innerHTML = imageUrl ? `<img src="${imageUrl}" alt="Üretilen ${data.brand} görseli"><p>${payload.prompt}</p>` : 'Fal.ai yanıtında görsel bulunamadı.';
    message.textContent = 'Görsel hazır.';
  } catch (error) {
    message.textContent = error.message;
    result.querySelector('.result-placeholder').textContent = 'Üretim yapılamadı. Sunucu ve FAL_KEY ayarlarını kontrol edin.';
  }
});
