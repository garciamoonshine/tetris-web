class InputHandler {
  constructor(game) {
    this.game = game;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.swipeThreshold = 30;
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      if (!this.game.running) return;
      if (this.game.paused) {
        if (e.code === 'KeyP') this.game.pause();
        return;
      }
      switch(e.code) {
        case 'ArrowLeft':  this.game.moveLeft(); break;
        case 'ArrowRight': this.game.moveRight(); break;
        case 'ArrowDown':  this.game.drop(); break;
        case 'ArrowUp':    this.game.rotate(); break;
        case 'Space':      e.preventDefault(); this.game.drop(true); break;
        case 'KeyP':       this.game.pause(); break;
      }
    });

    const canvas = document.getElementById('game-canvas');
    canvas.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }, { passive: true });

    canvas.addEventListener('touchend', (e) => {
      if (!this.game.running || this.game.paused) return;
      const dx = e.changedTouches[0].clientX - this.touchStartX;
      const dy = e.changedTouches[0].clientY - this.touchStartY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      if (Math.max(absDx, absDy) < this.swipeThreshold) {
        this.game.rotate();
      } else if (absDx > absDy) {
        dx > 0 ? this.game.moveRight() : this.game.moveLeft();
      } else {
        dy > 0 ? this.game.drop(true) : this.game.rotate();
      }
    }, { passive: true });
  }
}