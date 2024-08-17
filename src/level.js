let backgroundPattern;

function level_init() {
  
}

function level_render() {
  backgroundPattern = animatedContext.createPattern(backgroundImg, 'repeat');
  animatedContext.fillStyle = backgroundPattern;
  animatedContext.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);
}