function canvas_init() {
  animatedCanvas = document.getElementById('animatedCanvas');
  animatedContext = canvas_initCanvas(animatedCanvas, viewportWidth, viewportHeight);
};

function canvas_initCanvas(canvas, width, height) {
  let context = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  canvas.style.position = 'relative';
  canvas.style.top = 0;
  canvas.style.left = 0;

  // scale for scene magnification
  context.scale(magnification, magnification);

  context.webkitImageSmoothingEnabled = false;
  context.mozImageSmoothingEnabled = false;
  context.imageSmoothingEnabled = false;

  return context;
}