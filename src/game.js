function game_init() {
  userInputs_init();
  music_init();
  images_init();
  level_init();
  player_init();
  game_setViewportSize();
  webgl_init();
  game_setState(GAME_STATE_TITLE);
  game_loop();

  window.onresize = function() {
    game_setViewportSize();
    webgl_init();
  }

}

function game_render() {
  if (gameState === GAME_STATE_PLAYING) {
    level_render();

    //context.clearRect(0, 0, BASE_WIDTH, BASE_WIDTH)
    player_render();
  }
}

function game_setViewportSize() {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  // Helper function to find the largest factor of 32 that fits within a given value
  function getLargestFactorOf32(value) {
      let factor = 32;
      while (factor * 2 <= value) {
          factor *= 2;
      }

      return factor;
  }

  // Calculate the maximum width and height that fit the aspect ratio
  if (windowWidth / windowHeight > ASPECT_RATIO) {
      // Window is wider than the aspect ratio, limit by height
      viewportHeight = getLargestFactorOf32(windowHeight);
      viewportWidth = getLargestFactorOf32(viewportHeight * ASPECT_RATIO);
  } else {
      // Window is taller than the aspect ratio, limit by width
      viewportWidth = getLargestFactorOf32(windowWidth);
      viewportHeight = getLargestFactorOf32(viewportWidth / ASPECT_RATIO);
  }

  magnification = viewportWidth / BASE_WIDTH;

  let canvasContainer = document.getElementById('canvasContainer');
  canvasContainer.style.width = viewportWidth + 'px';
  canvasContainer.style.height = viewportHeight + 'px';
}

function game_setState(nextState) {
  let prevState = gameState;

  //console.log(prevState + '->' + nextState);

  // if state changing to self, kickout
  if (prevState === nextState) {
    return false;
  }

  gameState = nextState;

  // state transition scenarios

  if (nextState === GAME_STATE_TITLE) {

  }
  else if (nextState === GAME_STATE_PLAYING) {
    //music_start();  
  }
  else if (nextState === GAME_STATE_PAUSED) {
    music_stop();
  }
  // playing -> died
  else if (nextState === GAME_STATE_DIED) {

  }
  // playing -> win
  else if (nextState === GAME_STATE_WIN) {

  }
}

function game_update() { 
  if (gameState === GAME_STATE_PLAYING) {
    level_update();
    player_update();
  }
}

function game_loop() {
  now = new Date().getTime();

  if (startTime === 0) {
    startTime = now;
  }

  if (lastTime > 0) {
    elapsedTime = now - lastTime;
    totalElapsedTime = now - startTime;
    game_update();
    game_render();
  }

  lastTime = now;
  window.requestAnimationFrame(game_loop);  
}

// init game!
setTimeout(() => {
  game_init();
}, 0)
