const { buildPrompt } = require('../fal-ai/prompt-presets');

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!process.env.FAL_KEY) {
    response.status(503).json({ error: 'FAL_KEY is not configured on the server.' });
    return;
  }

  const { brand, part, composition = 'product' } = request.body || {};
  if (!brand || !part) {
    response.status(400).json({ error: 'brand and part are required.' });
    return;
  }

  const model = process.env.FAL_MODEL || 'fal-ai/flux/dev';
  const falResponse = await fetch(`https://fal.run/${model}`, {
    method: 'POST',
    headers: {
      Authorization: `Key ${process.env.FAL_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: buildPrompt({ brand, part, composition }),
      image_size: composition === 'banner' ? 'landscape_16_9' : 'square_hd',
      num_images: 1,
      enable_safety_checker: true
    })
  });

  const result = await falResponse.json();
  if (!falResponse.ok) {
    response.status(falResponse.status).json({ error: result.detail || result.error || 'Fal.ai request failed.' });
    return;
  }

  response.status(200).json({ prompt: buildPrompt({ brand, part, composition }), result });
};
