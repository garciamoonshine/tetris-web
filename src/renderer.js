class Renderer {
  constructor(canvas, nextCanvas) {
    this.ctx = canvas.getContext('2d');
    this.nextCtx = nextCanvas.getContext('2d');
    this.blockSize = BLOCK_SIZE;
  }

  drawBlock(ctx, x, y, color, size = BLOCK_SIZE) {
    ctx.fillStyle = color;
    ctx.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.fillRect(x * size + 1, y * size + 1, size - 2, 5);
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(x * size + 1, y * size + size - 6, size - 2, 5);
  }

  drawBoard(grid) {
    this.ctx.clearRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
    this.ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        this.ctx.strokeRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        if (grid[r][c]) this.drawBlock(this.ctx, c, r, COLORS[grid[r][c]]);
      }
    }
  }

  drawPiece(piece) {
    piece.shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) this.drawBlock(this.ctx, piece.x + c, piece.y + r, piece.color);
      });
    });
  }

  drawGhost(piece, board) {
    const ghost = piece.clone();
    while (board.isValidPosition(ghost, 0, 1)) ghost.y++;
    ghost.shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) {
          this.ctx.strokeStyle = piece.color;
          this.ctx.globalAlpha = 0.35;
          this.ctx.lineWidth = 1;
          this.ctx.strokeRect(
            (ghost.x + c) * BLOCK_SIZE + 1,
            (ghost.y + r) * BLOCK_SIZE + 1,
            BLOCK_SIZE - 2, BLOCK_SIZE - 2
          );
          this.ctx.globalAlpha = 1;
        }
      });
    });
  }

  drawNextPiece(piece) {
    this.nextCtx.clearRect(0, 0, 120, 120);
    const size = 24;
    const offsetX = Math.floor((5 - piece.shape[0].length) / 2);
    const offsetY = Math.floor((5 - piece.shape.length) / 2);
    piece.shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) {
          this.nextCtx.fillStyle = piece.color;
          this.nextCtx.fillRect((offsetX + c) * size, (offsetY + r) * size, size - 1, size - 1);
        }
      });
    });
  }

  drawGameOver(ctx) {
    ctx.fillStyle = 'rgba(0,0,0,0.72)';
    ctx.fillRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
    ctx.fillStyle = '#e94560';
    ctx.font = 'bold 24px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', COLS * BLOCK_SIZE / 2, ROWS * BLOCK_SIZE / 2 - 20);
    ctx.fillStyle = '#eee';
    ctx.font = '14px Courier New';
    ctx.fillText('Press START to play again', COLS * BLOCK_SIZE / 2, ROWS * BLOCK_SIZE / 2 + 10);
  }
}