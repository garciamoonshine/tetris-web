// Hold Piece System - Phase 2
let holdPiece = null;
let holdUsed = false;

function holdCurrentPiece() {
  if (holdUsed) return;
  const currentType = currentPiece ? currentPiece.type : null;
  if (!currentType) return;
  holdUsed = true;
  if (holdPiece === null) {
    holdPiece = currentType;
    spawnNewPiece();
  } else {
    const temp = holdPiece;
    holdPiece = currentType;
    spawnPieceOfType(temp);
  }
  renderHoldPiece();
}

function renderHoldPiece() {
  const holdCanvas = document.getElementById('holdCanvas');
  if (!holdCanvas) return;
  const hCtx = holdCanvas.getContext('2d');
  const BLOCK = 24;
  hCtx.clearRect(0, 0, holdCanvas.width, holdCanvas.height);
  if (holdPiece === null) return;
  const shapes = getTetrominoShapes();
  const shape = shapes[holdPiece][0];
  const color = getTetrominoColor(holdPiece);
  const offsetX = Math.floor((holdCanvas.width/BLOCK - shape[0].length) / 2);
  const offsetY = Math.floor((holdCanvas.height/BLOCK - shape.length) / 2);
  shape.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell) {
        hCtx.fillStyle = holdUsed ? '#555' : color;
        hCtx.fillRect((offsetX+c)*BLOCK+1, (offsetY+r)*BLOCK+1, BLOCK-2, BLOCK-2);
        hCtx.fillStyle = holdUsed ? '#444' : 'rgba(255,255,255,0.3)';
        hCtx.fillRect((offsetX+c)*BLOCK+1, (offsetY+r)*BLOCK+1, BLOCK-2, 4);
      }
    });
  });
}

function resetHold() { holdPiece = null; holdUsed = false; renderHoldPiece(); }
function releaseHold() { holdUsed = false; }
