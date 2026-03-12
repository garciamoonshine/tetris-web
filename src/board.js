class Board {
  constructor() {
    this.grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  reset() {
    this.grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  isValidPosition(piece, offsetX = 0, offsetY = 0) {
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (!piece.shape[r][c]) continue;
        const newX = piece.x + c + offsetX;
        const newY = piece.y + r + offsetY;
        if (newX < 0 || newX >= COLS || newY >= ROWS) return false;
        if (newY >= 0 && this.grid[newY][newX]) return false;
      }
    }
    return true;
  }

  lock(piece) {
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (!piece.shape[r][c]) continue;
        const y = piece.y + r;
        const x = piece.x + c;
        if (y >= 0) this.grid[y][x] = piece.type;
      }
    }
  }

  clearLines() {
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (this.grid[r].every(cell => cell !== 0)) {
        this.grid.splice(r, 1);
        this.grid.unshift(Array(COLS).fill(0));
        cleared++;
        r++;
      }
    }
    return cleared;
  }
}