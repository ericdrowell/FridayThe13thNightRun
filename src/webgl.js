class WebGLImageRenderer {
  constructor() {
      canvas = document.getElementById('canvas');
      context = canvas.getContext('webgl');
      canvas.width = viewportWidth;
      canvas.height = viewportHeight;
      canvas.style.width = viewportWidth + 'px';
      canvas.style.height = viewportHeight + 'px';
      canvas.style.top = 0;
      canvas.style.left = 0;

      this.canvas = canvas;
      this.gl = context

      if (!this.gl) {
          console.error('WebGL not supported, falling back on experimental-webgl');
          this.gl = canvas.getContext('experimental-webgl');
      }

      if (!this.gl) {
          throw new Error('Your browser does not support WebGL');
      }

      this.textureCache = {}; // Initialize texture cache

      this.initWebGL();
  }

  initWebGL() {
      // Enable blending and set the blend function
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

      // Vertex shader program
      const vertexShaderSource = `
          attribute vec2 a_position;
          attribute vec2 a_texCoord;
          uniform vec2 u_resolution;
          varying vec2 v_texCoord;
          
          void main() {
              vec2 zeroToOne = a_position / u_resolution;
              vec2 zeroToTwo = zeroToOne * 2.0;
              vec2 clipSpace = zeroToTwo - 1.0;

              gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
              v_texCoord = a_texCoord;
          }
      `;

      // Fragment shader program
      const fragmentShaderSource = `
          precision mediump float;
          varying vec2 v_texCoord;
          uniform sampler2D u_image;

          void main() {
              gl_FragColor = texture2D(u_image, v_texCoord);
          }
      `;

      // Compile shaders
      const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

      // Link shaders into a program
      this.program = this.createProgram(vertexShader, fragmentShader);

      // Look up attribute and uniform locations
      this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
      this.texCoordLocation = this.gl.getAttribLocation(this.program, 'a_texCoord');
      this.resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
      this.imageLocation = this.gl.getUniformLocation(this.program, 'u_image');

      // Create a buffer for positions
      this.positionBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

      // Create a buffer for texture coordinates
      this.texCoordBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
  }

  createShader(type, source) {
      const shader = this.gl.createShader(type);
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);

      const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
      if (success) {
          return shader;
      }

      console.error(this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
  }

  createProgram(vertexShader, fragmentShader) {
      const program = this.gl.createProgram();
      this.gl.attachShader(program, vertexShader);
      this.gl.attachShader(program, fragmentShader);
      this.gl.linkProgram(program);

      const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
      if (success) {
          return program;
      }

      console.error(this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
  }

  createTexture(image) {
      const texture = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      
      return texture;
  }

  drawImage(image, x, y, width, height) {
      // Check if the texture is already cached
      let texture = this.textureCache[image.src];
      if (!texture) {
          texture = this.createTexture(image);
          this.textureCache[image.src] = texture; // Cache the texture
      }

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
      const x1 = x;
      const y1 = y;
      const x2 = x + width;
      const y2 = y + height;
      const positions = [
          x1, y1,
          x2, y1,
          x1, y2,
          x1, y2,
          x2, y1,
          x2, y2,
      ];
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
      const texCoords = [
          0.0, 0.0,
          1.0, 0.0,
          0.0, 1.0,
          0.0, 1.0,
          1.0, 0.0,
          1.0, 1.0,
      ];
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texCoords), this.gl.STATIC_DRAW);

      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      this.gl.useProgram(this.program);

      this.gl.enableVertexAttribArray(this.positionLocation);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
      this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);

      this.gl.enableVertexAttribArray(this.texCoordLocation);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
      this.gl.vertexAttribPointer(this.texCoordLocation, 2, this.gl.FLOAT, false, 0, 0);

      this.gl.uniform2f(this.resolutionLocation, this.gl.canvas.width, this.gl.canvas.height);

      // Use the cached texture
      this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
      this.gl.uniform1i(this.imageLocation, 0);

      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }
}

function webgl_init() {
  renderer = new WebGLImageRenderer();
}
