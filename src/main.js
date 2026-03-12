window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas');
  const nextCanvas = document.getElementById('next-canvas');
  const renderer = new Renderer(canvas, nextCanvas);
  const board = new Board();
  const game = new Game(renderer, board);
  const input = new InputHandler(game);

  document.getElementById('start-btn').addEventListener('click', () => {
    game.start();
  });

  // draw empty board on load
  renderer.drawBoard(board.grid);

  // show best score on load
  const best = localStorage.getItem('tetris-highscore');
  if (best) {
    const scoreEl = document.getElementById('score');
    scoreEl.title = `Best: ${best}`;
  }
});