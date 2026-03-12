class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = {};
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      if (!this.game.running || this.game.paused) {
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
  }
}