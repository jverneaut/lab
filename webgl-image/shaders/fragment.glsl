precision mediump float;

varying vec2 v_texcoord;
varying vec2 v_position;

uniform sampler2D u_texture;

void main() {
  float xlookup = v_texcoord.x * 2.0 - 0.5;
  float ylookup = v_texcoord.y * 2.0 - 0.5;

  float distorsion = 0.04;

  xlookup = xlookup + distorsion * sin((v_position.y * 1.0 - 0.5) * 3.1415) * v_position.x;

  vec2 lookup = vec2(xlookup, ylookup);

  vec4 sampleColor = texture2D(u_texture, lookup);
  if (xlookup < 0.0 || xlookup > 1.0 || ylookup < 0.0 || ylookup > 1.0) {
    sampleColor = vec4(0.0, 0.0, 0.0, 0.0);
  }
  gl_FragColor = sampleColor;
}
