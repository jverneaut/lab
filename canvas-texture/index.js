const WIDTH = 500;
const HEIGHT = 250;

/** @type {HTMLCanvasElement} */
const canvas2D = document.querySelector('#not-gl');

/** @type {HTMLCanvasElement} */
const canvasGL = document.querySelector('#gl');

canvas2D.width = WIDTH;
canvasGL.width = WIDTH;

canvas2D.height = HEIGHT;
canvasGL.height = HEIGHT;

const context2D = canvas2D.getContext('2d');
const contextGL = canvasGL.getContext('webgl');

const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texcoord;

  varying vec2 v_texcoord;

  void main() {
    gl_Position = vec4(a_position, 1.0, 1.0);
    v_texcoord = a_texcoord;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  
  varying vec2 v_texcoord;

  uniform sampler2D u_texture;

  void main() {
    gl_FragColor =texture2D(u_texture, v_texcoord);
  }
`;

const vertexShader = contextGL.createShader(contextGL.VERTEX_SHADER);
contextGL.shaderSource(vertexShader, vertexShaderSource);
contextGL.compileShader(vertexShader);

const fragmentShader = contextGL.createShader(contextGL.FRAGMENT_SHADER);
contextGL.shaderSource(fragmentShader, fragmentShaderSource);
contextGL.compileShader(fragmentShader);

const program = contextGL.createProgram();
contextGL.attachShader(program, vertexShader);
contextGL.attachShader(program, fragmentShader);
contextGL.linkProgram(program);
contextGL.useProgram(program);

// Texture
const textureCoordinates = [[0, 0], [0, 1], [1, 0], [1, 1]].flat(); // [x, y]: [0, 1] x [0, 1]
const textureCoordinatesAttributeLocation = contextGL.getAttribLocation(program, 'a_texcoord');

const textureCoordinatesBuffer = contextGL.createBuffer();
contextGL.bindBuffer(contextGL.ARRAY_BUFFER, textureCoordinatesBuffer);
contextGL.bufferData(
  contextGL.ARRAY_BUFFER,
  new Float32Array(textureCoordinates),
  contextGL.STATIC_DRAW
);
contextGL.enableVertexAttribArray(textureCoordinatesAttributeLocation);
contextGL.vertexAttribPointer(
  textureCoordinatesAttributeLocation,
  2,
  contextGL.FLOAT,
  false,
  0,
  0
);

const texture = contextGL.createTexture();
contextGL.bindTexture(contextGL.TEXTURE_2D, texture);
contextGL.texParameteri(
  contextGL.TEXTURE_2D,
  contextGL.TEXTURE_WRAP_S,
  contextGL.CLAMP_TO_EDGE
);
contextGL.texParameteri(
  contextGL.TEXTURE_2D,
  contextGL.TEXTURE_WRAP_T,
  contextGL.CLAMP_TO_EDGE
);
contextGL.texParameteri(contextGL.TEXTURE_2D, contextGL.TEXTURE_MAG_FILTER, contextGL.NEAREST);
contextGL.texParameteri(contextGL.TEXTURE_2D, contextGL.TEXTURE_MIN_FILTER, contextGL.NEAREST);
contextGL.texImage2D(
  contextGL.TEXTURE_2D,
  0,
  contextGL.RGBA,
  contextGL.RGBA,
  contextGL.UNSIGNED_BYTE,
  canvas2D
);

// Rectangle
const vertices = [[-1, 1], [-1, -1], [1, 1], [1, -1]].flat(); // [x, y]: [-1, 1] x [-1, 1]
const verticesPositionAttributeLocation = contextGL.getAttribLocation(program, 'a_position');

const verticesPositionBuffer = contextGL.createBuffer();
contextGL.bindBuffer(contextGL.ARRAY_BUFFER, verticesPositionBuffer);
contextGL.bufferData(contextGL.ARRAY_BUFFER, new Float32Array(vertices), contextGL.STATIC_DRAW);
contextGL.enableVertexAttribArray(verticesPositionAttributeLocation);
contextGL.vertexAttribPointer(
  verticesPositionAttributeLocation,
  2,
  contextGL.FLOAT,
  false,
  0,
  0
);

const squareSize = 40;

const draw = time => {
  context2D.beginPath();
  context2D.rect(
    (0.5 * Math.sin(0.001 * time * 1.66) + 0.5) * (WIDTH - squareSize),
    (0.5 * Math.cos(0.001 * time) + 0.5) * (HEIGHT - squareSize),
    squareSize,
    squareSize
  );
  context2D.fillStyle = `hsl(${(0.04 * time) % 360}, 100%, 50%)`;
  context2D.fill();
  context2D.strokeStyle = `hsl(${(0.04 * time) % 360}, 75%, 25%)`;
  context2D.lineWidth = 1;
  context2D.stroke();

  contextGL.texImage2D(
    contextGL.TEXTURE_2D,
    0,
    contextGL.RGBA,
    contextGL.RGBA,
    contextGL.UNSIGNED_BYTE,
    canvas2D
  );

  contextGL.drawArrays(contextGL.TRIANGLE_STRIP, 0, 4);
  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
