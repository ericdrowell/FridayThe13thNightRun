function images_init(callback) {
  let imagesLoaded = 0;

  // Function to check if both images are loaded
  function checkIfBothImagesLoaded() {
      imagesLoaded++;
      if (imagesLoaded === 2) {
          callback();
      }
  }

  // Set up the image1's onload event
  spriteImg.onload = function() {
      checkIfBothImagesLoaded();
  };

  // Set up the image2's onload event
  backgroundImg.onload = function() {
      checkIfBothImagesLoaded();
  };

  // Set the source of the images to the provided URLs
  spriteImg.src = 'img/sprites.png';
  backgroundImg.src = 'img/woods.png';
}