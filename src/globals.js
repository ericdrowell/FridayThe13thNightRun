// constants
const ASPECT_RATIO = 2/1; // width/height
const BASE_WIDTH = 512;
const BASE_HEIGHT = BASE_WIDTH / ASPECT_RATIO;
const GAME_STATE_LOADING = 0;
const GAME_STATE_TITLE = 1;
const GAME_STATE_PLAYING = 2;
const GAME_STATE_PAUSED = 3;
const GAME_STATE_DIED = 4;
const GAME_STATE_WIN = 5;
const PLAYER_SPEED = 100; // pixels/second
const PLAYER_JUMP_SPEED = 300; // pixels/second
const GRAVITY = 0.07; // pixels/second^2
const LEVEL_SPEED = 50; // pixels/second
const LEVEL_WIDTH = 10000;

// variables
let viewportWidth = 0;
let viewportHeight = 0;
let animatedCanvas;
let animatedContext;
let backgroundCanvas;
let backgroundContext;
let backgroundCanvasX = 0;
let windowRatio;
let textures = [];
let gameState;
let magnification = 1;
let jasonImg = new Image();
let woodsImg = new Image();
let rocksImg = new Image();
let startTime = 0;
let totalElapsedTime = 0;
let elapsedTime = 0;
let lastTime = 0;
let now = 0;
let playerSprites = [];
let playerSprite;
let playerSpriteIndex=0;
let playerX=256;
let playerY=50;
let playerSpriteDuration=200; // ms
let playerYSpeed=0;
let playerXDirection=0;
let backgroundPattern;
let levelX=0;
let levelXChange=0;
let levelData = [];
let blockData = [];
let renderer;