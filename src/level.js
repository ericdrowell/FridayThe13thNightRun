

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
  const woodsWidth = woodsImg.width;
  const woodsHeight = woodsImg.height;
  const levelXMod = Math.round(levelX % woodsImg.width);

  renderer.drawImage(woodsImg, (levelXMod+woodsWidth*0)*magnification, 0, woodsWidth*magnification, woodsHeight*magnification);
  renderer.drawImage(woodsImg, (levelXMod+woodsWidth*1)*magnification, 0, woodsWidth*magnification, woodsHeight*magnification);
  renderer.drawImage(woodsImg, (levelXMod+woodsWidth*2)*magnification, 0, woodsWidth*magnification, woodsHeight*magnification);

  level_renderBlock(rockImgs[0], 400, 25)
  level_renderBlock(rockImgs[0], 400, 25+16)

  //renderer.drawImage(woodsImg, levelX + viewportWidth, 0, viewportWidth, viewportHeight);

  //backgroundCanvas.style.transform = 'translate3d(' + (levelX*magnification) + 'px, 0, 0)';

  //level_renderBlock(0, 0, 0);
}

function level_renderBlock(img, x, y) {
  renderer.drawImage(img, (levelX + x)*magnification, (BASE_HEIGHT -1 * y - img.height)*magnification, img.width*magnification, img.height*magnification);

}