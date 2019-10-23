attribute vec2 a_position;
attribute vec2 a_texcoord;

varying vec2 v_texcoord;
varying vec2 v_position;

void main() {
  float positionX = a_position.x;
  float positionY = a_position.y;

  positionX = positionX + 0.1 * a_position.x * sin((0.5 + 0.5 * positionY) * 3.14);

  vec2 position = vec2(positionX, positionY);

  gl_Position = vec4(position, 0, 1);
  v_texcoord = a_texcoord;
  v_position = a_position;
}
