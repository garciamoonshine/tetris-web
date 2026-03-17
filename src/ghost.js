// Ghost Piece - Phase 2
function drawGhostPiece(ctx, board, piece, BLOCK, COLS) {
  if (!piece) return;
  let ghostY = piece.y;
  while (!checkCollision(board, piece.shape, piece.x, ghostY + 1, COLS)) ghostY++;
  if (ghostY === piece.y) return;
  ctx.globalAlpha = 0.25;
  piece.shape.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell) {
        ctx.fillStyle = piece.color;
        ctx.fillRect((piece.x + c) * BLOCK + 1, (ghostY + r) * BLOCK + 1, BLOCK - 2, BLOCK - 2);
      }
    });
  });
  ctx.globalAlpha = 1.0;
}

function checkCollision(board, shape, x, y, COLS) {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const nx = x + c, ny = y + r;
      if (nx < 0 || nx >= COLS || ny >= board.length) return true;
      if (ny >= 0 && board[ny][nx]) return true;
    }
  }
  return false;
}
