function userInputs_init() {
  document.addEventListener('keydown', function(evt) {
    userInputs_handleKeyDown(evt);
  }, false);
  
  document.addEventListener('keyup', function(evt) {
    userInputs_handleKeyUp(evt);
  }, false);
};

function userInputs_handleKeyDown(evt) {
  if (gameState === GAME_STATE_TITLE) {
    game_setState(GAME_STATE_PLAYING);
    
  }
  else if (gameState === GAME_STATE_PLAYING) {
    let keycode = ((evt.which) || (evt.keyCode));

    console.log(keycode)

    switch (keycode) {
      case 27:
        // esc key
        game_setState(GAME_STATE_PAUSED);
        break;
      case 39:
        // right arrow key
        playerXDirection = 1;
        break;
      case 37:
        // left arrow key
        playerXDirection = -1;
        break;
      case 38:
        // up arrow key
        player_jump();
        break;
      case 32:
        // space
        player_attack();
        break;
    }
  }
};

function userInputs_handleKeyUp(evt) {
  let keycode = ((evt.which) || (evt.keyCode));

  switch (keycode) {
    case 39:
      // right arrow key
      if (playerXDirection === 1) {
        playerXDirection = 0;
      }
      
      break;
    case 37:
      // left arrow key
      if (playerXDirection === -1) {
        playerXDirection = 0;
      }
      
      break;
  }
};