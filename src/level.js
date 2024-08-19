

function level_init() {

}

function level_initCanvas() {
  backgroundPattern = backgroundContext.createPattern(backgroundImg, 'repeat');
  backgroundContext.fillStyle = backgroundPattern;
  backgroundContext.fillRect(0, 0, LEVEL_WIDTH, BASE_HEIGHT);  
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