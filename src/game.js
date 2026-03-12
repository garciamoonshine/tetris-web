class Game {
  constructor(renderer, board) {
    this.renderer = renderer;
    this.board = board;
    this.score = 0;
    this.level = 1;
    this.lines = 0;
    this.current = null;
    this.next = null;
    this.running = false;
    this.paused = false;
    this.gameOver = false;
    this.lastTime = 0;
    this.dropCounter = 0;
    this.animId = null;
  }

  start() {
    this.board.reset();
    this.score = 0;
    this.level = 1;
    this.lines = 0;
    this.gameOver = false;
    this.current = Tetromino.random();
    this.next = Tetromino.random();
    this.updateUI();
    this.running = true;
    this.paused = false;
    if (this.animId) cancelAnimationFrame(this.animId);
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  pause() {
    this.paused = !this.paused;
    if (!this.paused) {
      this.lastTime = performance.now();
      this.loop(this.lastTime);
    }
  }

  loop(time) {
    if (!this.running || this.paused) return;
    const delta = time - this.lastTime;
    this.lastTime = time;
    this.dropCounter += delta;
    const speed = SPEEDS[Math.min(this.level - 1, SPEEDS.length - 1)];
    if (this.dropCounter >= speed) {
      this.drop();
      this.dropCounter = 0;
    }
    this.render();
    this.animId = requestAnimationFrame(t => this.loop(t));
  }

  drop(hard = false) {
    if (hard) {
      while (this.board.isValidPosition(this.current, 0, 1)) this.current.y++;
      this.lock();
      return;
    }
    if (this.board.isValidPosition(this.current, 0, 1)) {
      this.current.y++;
    } else {
      this.lock();
    }
  }

  lock() {
    this.board.lock(this.current);
    const cleared = this.board.clearLines();
    if (cleared > 0) {
      this.lines += cleared;
      this.score += POINTS[cleared] * this.level;
      this.level = Math.floor(this.lines / 10) + 1;
      this.updateUI();
    }
    this.current = this.next;
    this.next = Tetromino.random();
    if (!this.board.isValidPosition(this.current)) {
      this.running = false;
      this.gameOver = true;
      this.renderer.drawGameOver(this.renderer.ctx);
      this.saveHighScore();
    }
  }

  moveLeft() {
    if (this.board.isValidPosition(this.current, -1, 0)) this.current.x--;
  }

  moveRight() {
    if (this.board.isValidPosition(this.current, 1, 0)) this.current.x++;
  }

  rotate() {
    const rotated = this.current.rotate();
    const prev = this.current.shape;
    this.current.shape = rotated;
    if (!this.board.isValidPosition(this.current)) {
      // wall kick attempts
      this.current.x++;
      if (!this.board.isValidPosition(this.current)) {
        this.current.x -= 2;
        if (!this.board.isValidPosition(this.current)) {
          this.current.x++;
          this.current.shape = prev;
        }
      }
    }
  }

  render() {
    this.renderer.drawBoard(this.board.grid);
    this.renderer.drawGhost(this.current, this.board);
    this.renderer.drawPiece(this.current);
    this.renderer.drawNextPiece(this.next);
  }

  updateUI() {
    document.getElementById('score').textContent = this.score;
    document.getElementById('level').textContent = this.level;
    document.getElementById('lines').textContent = this.lines;
  }

  saveHighScore() {
    const best = parseInt(localStorage.getItem('tetris-highscore') || '0');
    if (this.score > best) localStorage.setItem('tetris-highscore', this.score);
  }
}