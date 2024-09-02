

function level_init() {
  levelData = [
    [rockImgs[0], 400, 25],
    [rockImgs[0], 400, 25+16],
    [rockImgs[0], 400, 25+32]
  ]
}

function level_update() {
  levelXChange = Math.round(elapsedTime * LEVEL_SPEED/1000 * -1);
  levelX += levelXChange;
}

function level_render() {
  const woodsWidth = woodsImg.width;
  const woodsHeight = woodsImg.height;
  const levelXMod = Math.round(levelX % woodsImg.width);

  // render background woods
  renderer.drawImage(woodsImg, (levelXMod+woodsWidth*0)*magnification, 0, woodsWidth*magnification, woodsHeight*magnification);
  renderer.drawImage(woodsImg, (levelXMod+woodsWidth*1)*magnification, 0, woodsWidth*magnification, woodsHeight*magnification);
  renderer.drawImage(woodsImg, (levelXMod+woodsWidth*2)*magnification, 0, woodsWidth*magnification, woodsHeight*magnification);

  // render level data
  levelData.forEach((data) => {
    level_renderBlock(data[0], data[1], data[2])
  });
}

function level_renderBlock(img, x, y) {
  renderer.drawImage(img, (levelX + x)*magnification, (BASE_HEIGHT -1 * y - img.height)*magnification, img.width*magnification, img.height*magnification);

}