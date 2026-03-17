// Pollinations AI Image Integration for Tetris
const POLLINATIONS_TOKEN = 'sk_XAwK4NoIzJVceQNqn1SG22oDgJPkkMYA';
const POLLINATIONS_BASE = 'https://image.pollinations.ai/prompt/';

function getPollinationsUrl(prompt, width = 240, height = 480, seed = null) {
  const encoded = encodeURIComponent(prompt);
  let url = `${POLLINATIONS_BASE}${encoded}?width=${width}&height=${height}&nologo=true&token=${POLLINATIONS_TOKEN}`;
  if (seed !== null) url += `&seed=${seed}`;
  return url;
}

// Unique background art per level (1-10+)
const levelBgPrompts = [
  'pixel art space nebula, dark background, subtle stars, game art',              // level 1
  'pixel art deep ocean, dark blue, subtle bioluminescent creatures',              // level 2
  'pixel art lava cave, glowing magma, dark volcanic background',                  // level 3
  'pixel art frozen tundra, ice crystals, dark blue cold atmosphere',             // level 4
  'pixel art cyberpunk city, neon lights, dark rainy night background',           // level 5
  'pixel art ancient temple ruins, dark jungle, mystical glowing ruins',          // level 6
  'pixel art haunted mansion, dark gothic background, subtle bats',               // level 7
  'pixel art enchanted forest, dark mystical trees, glowing mushrooms',           // level 8
  'pixel art desert at night, dark sky, ancient pyramids silhouette',             // level 9
  'pixel art sky kingdom clouds, dark ethereal background, floating islands'      // level 10
];

const levelBgImages = {};

async function loadLevelBackground(level) {
  const idx = Math.min(level - 1, levelBgPrompts.length - 1);
  if (levelBgImages[idx]) return levelBgImages[idx];
  const img = new Image();
  img.crossOrigin = 'anonymous';
  await new Promise(resolve => {
    img.onload = resolve;
    img.onerror = resolve;
    img.src = getPollinationsUrl(levelBgPrompts[idx], 240, 480, idx * 17);
  });
  levelBgImages[idx] = img;
  console.log(`[Pollinations] Loaded Tetris background for level ${level}`);
  return img;
}

// Preload first 3 level backgrounds
async function preloadTetrisBackgrounds() {
  for (let i = 1; i <= 3; i++) {
    await loadLevelBackground(i);
  }
}

preloadTetrisBackgrounds();

window.loadLevelBackground = loadLevelBackground;
window.levelBgImages = levelBgImages;
window.getPollinationsUrl = getPollinationsUrl;
