class Tetromino {
  constructor(type) {
    this.type = type;
    this.shape = SHAPES[type].map(row => [...row]);
    this.color = COLORS[type];
    this.x = Math.floor(COLS / 2) - Math.floor(this.shape[0].length / 2);
    this.y = 0;
  }

  static random() {
    const type = Math.floor(Math.random() * 7) + 1;
    return new Tetromino(type);
  }

  rotate() {
    const rows = this.shape.length;
    const cols = this.shape[0].length;
    const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        rotated[c][rows - 1 - r] = this.shape[r][c];
      }
    }
    return rotated;
  }

  clone() {
    const t = new Tetromino(this.type);
    t.shape = this.shape.map(row => [...row]);
    t.x = this.x;
    t.y = this.y;
    return t;
  }
}