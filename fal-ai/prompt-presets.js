const BRAND_STYLES = {
  porsche: 'Porsche-inspired precision, deep graphite and racing red accents, technical studio lighting',
  maserati: 'Maserati-inspired Italian elegance, midnight navy, brushed chrome, refined studio lighting',
  ferrari: 'Ferrari-inspired performance, vivid rosso red, carbon fiber, dramatic premium studio lighting',
  bentley: 'Bentley-inspired grand touring luxury, British racing green, rich leather, soft directional studio lighting',
  lamborghini: 'Lamborghini-inspired sculptural performance, acid yellow accents, black carbon fiber, hard rim light',
  'aston-martin': 'Aston Martin-inspired understated luxury, forest green, satin metal, cinematic studio lighting',
  tesla: 'Tesla-inspired clean electric design, pearl white, cool metal, minimal architectural studio lighting',
  'alfa-romeo': 'Alfa Romeo-inspired Italian sport elegance, deep burgundy, black metal, warm studio lighting'
};

const PART_STYLES = {
  banner: 'wide editorial automotive e-commerce hero composition with generous negative space for typography',
  product: 'isolated genuine automotive replacement part, three-quarter product view, neutral premium studio background',
  category: 'premium automotive parts category composition, multiple compatible parts arranged with clear visual hierarchy'
};

function buildPrompt({ brand, part, composition }) {
  const brandStyle = BRAND_STYLES[brand] || 'premium luxury automotive studio aesthetic, dark graphite background';
  const compositionStyle = PART_STYLES[composition] || PART_STYLES.product;
  return `${brandStyle}. ${compositionStyle}. Subject: ${part}. Photorealistic, high detail, accurate material textures, clean edges, no people, no watermark, no logo text, no distorted parts. For a luxury automotive spare-parts e-commerce platform.`;
}

module.exports = { BRAND_STYLES, PART_STYLES, buildPrompt };
