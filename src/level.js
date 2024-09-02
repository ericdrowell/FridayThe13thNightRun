

function level_init() {
  blockData = [
    [0, 0, 25, 25]
  ];
  levelData = []
}

function level_update() {
  levelXChange = Math.round(elapsedTime * LEVEL_SPEED/1000 * -1);
  levelX += levelXChange;
  // if (backgroundCanvasX < BASE_WIDTH * -1) {
  //   backgroundCanvasX += BASE_WIDTH;
  // }

}

function level_render() {
  const woodsWidthMag = woodsImg.width*magnification;
  const woodsHeightMag = woodsImg.height*magnification;
  const levelXMag = levelX * magnification;

  renderer.drawImage(woodsImg, levelXMag, 0, woodsWidthMag, woodsHeightMag);
  renderer.drawImage(woodsImg, levelXMag+woodsWidthMag, 0, woodsWidthMag, woodsHeightMag);
  renderer.drawImage(woodsImg, levelXMag+woodsWidthMag*2, 0, woodsWidthMag, woodsHeightMag);


  //renderer.drawImage(woodsImg, levelX + viewportWidth, 0, viewportWidth, viewportHeight);

  //backgroundCanvas.style.transform = 'translate3d(' + (levelX*magnification) + 'px, 0, 0)';

  //level_renderBlock(0, 0, 0);
}

function level_renderBlock(blockIndex, x, y) {
    const block = blockData[blockIndex];
    const sx = block[0];
    const sy = block[1];
    const sWidth = block[2];
    const sHeight = block[3];

    renderer.drawImage(rocksImg, sx, sy, sWidth, sHeight, x, -1 * y, sWidth, sHeight);
}