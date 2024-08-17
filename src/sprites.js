function sprites_init(callback) {

  // Set up the image's onload event to draw it onto the canvas once it's loaded
  spriteImg.onload = function() {
      callback();
  };

  // Set the source of the image to the provided URL
  spriteImg.src = 'img/sprites.png';
}