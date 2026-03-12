# 🧱 Tetris Web

A modern, fully-featured Tetris game built with HTML5 Canvas and vanilla JavaScript. No frameworks, no dependencies — just pure web tech.

## 🎮 Features

- All 7 classic Tetrominoes (I, J, L, O, S, T, Z)
- Ghost piece for drop preview
- Wall kick system for rotation near boundaries
- Progressive difficulty — speed increases every 10 lines
- Score system with level multipliers (100/300/500/800)
- Next piece preview panel
- Local high score persistence via localStorage
- Touch/swipe controls for mobile
- Pause support
- CSS3 styled UI with dark theme

## 🚀 How to Play

1. Open `index.html` in any modern browser
2. Click **START** or press **Space** to begin
3. Clear lines to score points — more lines at once = more points!

## ⌨️ Controls

| Key | Action |
|-----|--------|
| ← → | Move left / right |
| ↑ | Rotate piece |
| ↓ | Soft drop |
| Space | Hard drop (instant) |
| P | Pause / Resume |

### Mobile
- **Swipe left/right** — Move
- **Swipe down** — Hard drop
- **Tap** — Rotate

## 📁 Project Structure

```
tetris-web/
├── index.html
├── style.css
└── src/
    ├── constants.js    # Game constants (colors, shapes, speeds)
    ├── tetromino.js   # Tetromino class with rotation
    ├── board.js       # Board grid, collision, line clearing
    ├── renderer.js    # Canvas drawing (board, pieces, ghost)
    ├── game.js        # Game loop, scoring, level logic
    ├── input.js       # Keyboard + touch input handler
    └── main.js        # Entry point, DOM bindings
```

## 🛠️ Tech Stack

- HTML5 Canvas API
- Vanilla JavaScript (ES6 classes)
- CSS3 with flexbox layout
- localStorage for score persistence

## 📈 Scoring

| Lines Cleared | Points x Level |
|---|---|
| 1 (Single) | 100 |
| 2 (Double) | 300 |
| 3 (Triple) | 500 |
| 4 (Tetris!) | 800 |