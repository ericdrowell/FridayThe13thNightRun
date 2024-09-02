

function level_init() {
  blockData = [
    [0, 0, 25, 25]
  ];
  levelData = []
}

function level_preRender() {
  backgroundContext.save();

  // draw woods
  backgroundPattern = backgroundContext.createPattern(woodsImg, 'repeat');
  backgroundContext.fillStyle = backgroundPattern;
  backgroundContext.fillRect(0, 0, LEVEL_WIDTH, BASE_HEIGHT);  

  // draw rocks
  backgroundContext.translate(0, BASE_HEIGHT - 50);
  
  
  level_renderBlock(0, 200, 30)

  backgroundContext.restore();

}

function level_update() {
  levelXChange = Math.round(elapsedTime * LEVEL_SPEED/1000 * -1);
  levelX += levelXChange;
  // if (backgroundCanvasX < BASE_WIDTH * -1) {
  //   backgroundCanvasX += BASE_WIDTH;
  // }

}

function level_render() {
  backgroundCanvas.style.transform = 'translate3d(' + (levelX*magnification) + 'px, 0, 0)';
}

function level_renderBlock(blockIndex, x, y) {
    const block = blockData[blockIndex];
    const sx = block[0];
    const sy = block[1];
    const sWidth = block[2];
    const sHeight = block[3];
    backgroundContext.drawImage(rocksImg, sx, sy, sWidth, sHeight, x, -1 * y, sWidth, sHeight);
}