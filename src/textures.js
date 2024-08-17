const TEXTURES_DIRT = 0;

function textures_createTextureCanvas() {
  let textureCanvas = document.createElement('canvas');
  textureCanvas.width = 32;
  textureCanvas.height = 32;
  textureContext = textureCanvas.getContext('2d');
  return [textureCanvas, textureContext];
}

function textures_init() {
  // -------------------------------------------------------------------
  textures[TEXTURES_DIRT] = (function() {
    [textureCanvas, textureContext] = textures_createTextureCanvas();

    textures_drawGrunge('#161616', textureContext);
  
    return textureCanvas;
  })();
};

// draw utils -----------------------------------------------------

function textures_drawRect(x, y, width, height, color, textureContext) {
  textureContext.fillStyle = color;
  textureContext.fillRect(x, y, width, height);
}

function textures_drawPipeRidges(textureContext) {
  for (let n=0; n<4; n++) {
    // highlight
    textureContext.fillStyle = 'rgba(255, 255, 255, 0.05)';
    textureContext.fillRect(n*8, 0, 4, 32);
  
    // shadow
    textureContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
    textureContext.fillRect(2 + n*8, 0, 4, 32);
  }
}

function textures_drawBolt(x, y, textureContext) {
  textureContext.beginPath();
  textureContext.arc(x, y, 1.5, 0, Math.PI*2, false);
  textureContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
  textureContext.fill();

  textureContext.beginPath();
  textureContext.arc(x-1, y-1, 1.5, 0, Math.PI*2, false);
  textureContext.fillStyle = 'rgba(255, 255, 255, 0.1)';
  textureContext.fill();
}

function textures_drawBorder(color, inset, textureContext) {
  textureContext.fillStyle = color;
  textureContext.fillRect(inset, inset, 1, 32-inset*2);
  textureContext.fillRect(31-inset, inset, 1, 32-inset*2);
  textureContext.fillRect(inset, inset, 32-inset*2, 1);
  textureContext.fillRect(inset, 31-inset, 32-inset*2, 1);
}

function textures_drawTopLeftBorder(color, textureContext) {
  textureContext.fillStyle = color;
  textureContext.fillRect(0, 0, 31, 1); // top
  textureContext.fillRect(0, 0, 1, 31); // left
}

function textures_drawBottomRightBorder(color, textureContext) {
  textureContext.fillStyle = color;
  textureContext.fillRect(31, 1, 1, 31); // right
  textureContext.fillRect(0, 31, 31, 1); // bottom
}

function textures_drawGrunge(color, textureContext) {
  let rgb = textures_hexToRgb(color);
  let maxChannelOffset = 20;
  
  for (let x=0; x<32; x++) {
    for (let y=0; y<32; y++) {
      let grungeRgb = {
        r: textures_grungeChannel(rgb.r, maxChannelOffset),
        g: textures_grungeChannel(rgb.g, maxChannelOffset),
        b: textures_grungeChannel(rgb.b, maxChannelOffset)
      };
      let hexColor = textures_rgbToHex(grungeRgb);
      textureContext.fillStyle = hexColor;
      textureContext.fillRect(x, y, 1, 1);
    }
  }
}

function textures_drawStripes(textureContext) {
  textures_drawGrunge('#807218');

  textureContext.fillStyle = 'rgba(0, 0, 0, 0.8)';

  textureContext.beginPath();
  textureContext.moveTo(0, 0);
  textureContext.lineTo(32, 32);
  textureContext.lineTo(16, 32);
  textureContext.lineTo(0, 16);
  textureContext.closePath();
  textureContext.fill();


  textureContext.beginPath();
  textureContext.moveTo(16, 0);
  textureContext.lineTo(32, 0);
  textureContext.lineTo(32, 16);
  textureContext.closePath();
  textureContext.fill();

  // highlight
  textureContext.fillStyle = 'rgba(255, 255, 255, 0.07)';
  textureContext.fillRect(0, 0, 1, 32);

  // shadow
  textureContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
  textureContext.fillRect(31, 0, 1, 32);
}

function textures_drawBolts(textureContext) {
  textures_drawBolt(5, 5);
  textures_drawBolt(5, 27);
  textures_drawBolt(27, 5);
  textures_drawBolt(27, 27);
}

function textures_drawBoltTexture(textureContext) {
  for (let x=6; x<32; x+=11) {
    for (let y=6; y<32; y+=11) {
      textures_drawBolt(x, y, textureContext);
    }
  }
}

function textures_addDepth(func) {
  textureContext.save();
  textureContext.translate(1, 1);
  func(0);
  textureContext.restore();

  func(1);
};

function textures_hexToRgb(hex) {
  hex = hex.replace('#', '');
  var bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  }
}

function textures_componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function textures_rgbToHex(rgb) {
  return '#' + textures_componentToHex(rgb.r) + textures_componentToHex(rgb.g) + textures_componentToHex(rgb.b);
}

function textures_grungeChannel(channel, maxChannelOffset) {
  let newChannel = Math.floor(channel + Math.random() * maxChannelOffset);
  if (newChannel > 255) {
    newChannel = 255;
  }
  else if (newChannel < 0) {
    newChannel = 0;
  }
  return newChannel;
}