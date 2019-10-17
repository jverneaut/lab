import { createShader, createProgram, createTexture, drawRect } from './utils';

import vShaderSource from './shaders/vertex.glsl';
import fShaderSource from './shaders/fragment.glsl';

const RESOLUTION = 2;

const init = () => {
  const canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth * RESOLUTION;
  canvas.height = window.innerHeight * RESOLUTION;
  const gl = canvas.getContext('webgl');

  const vShader = createShader(gl, gl.VERTEX_SHADER, vShaderSource);
  const fShader = createShader(gl, gl.FRAGMENT_SHADER, fShaderSource);

  const program = createProgram(gl, vShader, fShader);
  gl.useProgram(program);

  const image = document.querySelector('img');
  const texture = createTexture(gl, program, image);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const draw = () => {
    const { left, right, top, bottom } = image.getBoundingClientRect();

    const settings = {
      top: 1 - 2 * (top / window.innerHeight),
      bottom: 1 - 2 * (bottom / window.innerHeight),
      left: 2 * (left / window.innerWidth) - 1,
      right: 2 * (right / window.innerWidth) - 1,
    };

    drawRect(gl, program, settings);
    requestAnimationFrame(draw);
  };

  draw();
};

window.onload = init;
