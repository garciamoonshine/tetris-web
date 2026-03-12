window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');
  const nextCanvas = document.getElementById('next-canvas');
  const renderer = new Renderer(canvas, nextCanvas);
  const board = new Board();
  const game = new Game(renderer, board);
  const input = new InputHandler(game);

  // High score display
  const best = parseInt(localStorage.getItem('tetris-highscore') || '0');
  const highScoreEl = document.createElement('div');
  highScoreEl.id = 'highscore-box';
  highScoreEl.innerHTML = `<p>BEST</p><span id="highscore">${best}</span>`;
  highScoreEl.style.cssText = 'background:#16213e;border:1px solid #0f3460;border-radius:6px;padding:10px;text-align:center;';
  document.getElementById('sidebar').insertBefore(highScoreEl, document.getElementById('start-btn'));

  document.getElementById('start-btn').addEventListener('click', () => {
    game.start();
  });

  // Update high score display after game over
  const origSaveHighScore = game.saveHighScore.bind(game);
  game.saveHighScore = function() {
    origSaveHighScore();
    document.getElementById('highscore').textContent = localStorage.getItem('tetris-highscore') || '0';
  };

  renderer.drawBoard(board.grid);
});