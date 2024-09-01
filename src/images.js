function images_init(callback) {
  let imagesLoaded = 0;
  const images = ['img/jason.png','img/woods.png', 'img/rocks.png'];

  // Function to check if both images are loaded
  function checkIfBothImagesLoaded() {
      imagesLoaded++;
      if (imagesLoaded >= images.length) {
          callback();
      }
  }

  // Set up the image1's onload event
  jasonImg.onload = function() {
      checkIfBothImagesLoaded();
  };

  woodsImg.onload = function() {
      checkIfBothImagesLoaded();
  };

  rocksImg.onload = function() {
      checkIfBothImagesLoaded();
  };

  // Set the source of the images to the provided URLs
  jasonImg.src = images[0];
  woodsImg.src = images[1];
  rocksImg.src = images[2];
}