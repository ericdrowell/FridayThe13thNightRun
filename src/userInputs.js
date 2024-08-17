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

    switch (keycode) {
      case 27:
        // esc key
        game_setState(GAME_STATE_PAUSED);
        break;
      case 65:
        // a key (strafe left)
        player.sideMovement = -1;
        break;
      case 87:
        // w key (move forward)
        player.straightMovement = 1;
        break;
      case 68:
        // d key (strafe right)
        player.sideMovement = 1;
        break;
      case 83: 
        // s key (move backwards)
        player.straightMovement = -1;
        break;
      case 32:
        player_jump();
        break;
    }
  }
};

function userInputs_handleKeyUp(evt) {
  if (gameState === GAME_STATE_PLAYING) {
    let keycode = ((evt.which) || (evt.keyCode));

    switch (keycode) {
      case 65:
        // a key
        player.sideMovement = 0;
        break;
      case 87:
        // w key
        player.straightMovement = 0;
        
        break;
      case 68:
        // d key
        player.sideMovement = 0;
        break;
      case 83:
        // s key
        player.straightMovement = 0;
        break;
    }
  }
};