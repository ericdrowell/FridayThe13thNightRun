function player_init() {
  playerSprites = [
    [0, 0, 23, 42],
    //[23, 0, 15, 42],
    [39, 0, 24, 42],
    [63, 0, 26, 42],
    [89, 0, 44, 42]
  ]
}

function player_update() {
  const spriteCount = playerSprites.length;
  const playerSpriteIndex = Math.floor(totalElapsedTime / playerSpriteDuration) % spriteCount;
  playerSprite = playerSprites[playerSpriteIndex];

  //playerX+=1;
}

function player_render() {
  animatedContext.save();
  animatedContext.translate(playerX, 0)
  animatedContext.drawImage(spriteImg, playerSprite[0], playerSprite[1], playerSprite[2], playerSprite[3], 0, 0, playerSprite[2], playerSprite[3]);
  animatedContext.restore();
}