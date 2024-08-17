function player_init() {
  playerSprites = [
    [0, 0, 23, 42],
    //[23, 0, 15, 42],
    [39, 0, 24, 42],
    //[63, 0, 26, 42],
    //[89, 0, 44, 42]
  ]
}

function player_update() {
  const spriteCount = playerSprites.length;
  const playerSpriteIndex = Math.floor(totalElapsedTime / playerSpriteDuration) % spriteCount;

  // sprites
  playerSprite = playerSprites[playerSpriteIndex];

  // x position
  playerX += Math.round(elapsedTime * PLAYER_SPEED/1000 * playerXDirection);



  // y position
  playerYSpeed -= 0.5 * GRAVITY * elapsedTime * elapsedTime;
  playerY += Math.round(elapsedTime * playerYSpeed/1000);

  if (playerY < 30) {
    playerY = 30;
  }

  console.log(playerY)
}

function player_render() {
  animatedContext.save();
  //animatedContext.scale(1, -1);
  animatedContext.translate(0, BASE_HEIGHT - playerSprite[3]);
  animatedContext.translate(playerX, -1 * playerY)
  animatedContext.drawImage(spriteImg, playerSprite[0], playerSprite[1], playerSprite[2], playerSprite[3], 0, 0, playerSprite[2], playerSprite[3]);
  animatedContext.restore();
}

function player_jump() {
  playerYSpeed = PLAYER_JUMP_SPEED;
}