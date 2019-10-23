export const createShader = (context, shaderType, shaderSource) => {
  const shader = context.createShader(shaderType);
  context.shaderSource(shader, shaderSource);
  context.compileShader(shader);

  return shader;
};

export const createProgram = (context, vertexShader, fragmentShader) => {
  const program = context.createProgram();
  context.attachShader(program, vertexShader);
  context.attachShader(program, fragmentShader);
  context.linkProgram(program);

  return program;
};

export const createTexture = (context, image) => {
  const texture = context.createTexture();
  context.bindTexture(context.TEXTURE_2D, texture);
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
  context.texImage2D(
    context.TEXTURE_2D,
    0,
    context.RGBA,
    context.RGBA,
    context.UNSIGNED_BYTE,
    image
  );

  return texture;
};

// const createTexture = (context, program, image) => {
//   // prettier-ignore
//   const texcoord = [
//     0.0, 0.0,
//     0.0, 1.0,
//     1.0, 0.0,
//     1.0, 1.0,
//   ];

//   const texcoordAttributeLocation = context.getAttribLocation(program, 'a_texcoord');

//   const texcoordBuffer = context.createBuffer();
//   context.bindBuffer(context.ARRAY_BUFFER, texcoordBuffer);
//   context.bufferData(context.ARRAY_BUFFER, new Float32Array(texcoord), context.STATIC_DRAW);
//   context.enableVertexAttribArray(texcoordAttributeLocation);
//   context.vertexAttribPointer(texcoordAttributeLocation, 2, context.FLOAT, false, 0, 0);

//   const texture = context.createTexture();
//   context.bindTexture(context.TEXTURE_2D, texture);
//   context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
//   context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
//   context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
//   context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
//   context.texImage2D(
//     context.TEXTURE_2D,
//     0,
//     context.RGBA,
//     context.RGBA,
//     context.UNSIGNED_BYTE,
//     image
//   );

//   return texture;
// };

// const drawRect = (context, program, settings) => {
//   // prettier-ignore
//   const positions = [
//     settings.left * 2, settings.top * 2,
//     settings.left * 2, settings.bottom * 2,
//     settings.right * 2, settings.top * 2,
//     settings.right * 2, settings.bottom * 2,
//   ];

//   const positionAttributeLocation = context.getAttribLocation(program, 'a_position');

//   const positionsBuffer = context.createBuffer();
//   context.bindBuffer(context.ARRAY_BUFFER, positionsBuffer);
//   context.bufferData(context.ARRAY_BUFFER, new Float32Array(positions), context.STATIC_DRAW);
//   context.enableVertexAttribArray(positionAttributeLocation);
//   context.vertexAttribPointer(positionAttributeLocation, 2, context.FLOAT, false, 0, 0);

//   context.drawArrays(context.TRIANGLE_STRIP, 0, 4);
// };

// export { createShader, createProgram, createTexture, drawRect };
