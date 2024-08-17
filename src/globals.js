// constants
const ASPECT_RATIO = 2/1; // width/height
const BASE_WIDTH = 512;
const GAME_STATE_LOADING = 0;
const GAME_STATE_TITLE = 1;
const GAME_STATE_PLAYING = 2;
const GAME_STATE_PAUSED = 3;
const GAME_STATE_DIED = 4;
const GAME_STATE_WIN = 5;

// variables
let viewportWidth = 0;
let viewportHeight = 0;
let animatedCanvas;
let animatedContext;
let windowRatio;
let textures = [];
let gameState;
let magnification = 1;
let spriteImg = new Image();
let startTime = 0;
let totalElapsedTime = 0;
let elapsedTime = 0;
let lastTime = 0;
let now = 0;
let playerSprites = [];
let playerSprite;
let playerSpriteIndex=0;
let playerX=0;
let playerY=0;
let playerSpriteDuration=200; // ms