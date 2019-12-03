import munkres from 'munkres-js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const WIDTH = 600;
const HEIGHT = 600;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const reset = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
};

const drawLetter = letter => {
  ctx.font = '600px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT);
};

const getBlackPixelsPos = () => {
  const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);

  const blackPixels = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3];

    const x = (i / 4) % imageData.width;
    const y = Math.floor(i / 4 / imageData.width);

    if (r + g + b === 0 && a != 0) {
      blackPixels.push({ x, y });
    }
  }

  return blackPixels;
};

drawLetter('A');
const aPixelPos = getBlackPixelsPos();
reset();

drawLetter('Z');
const bPixelPos = getBlackPixelsPos();
reset();

const PARTICLES_COUNT = 300;
const PARTICLE_SIZE = 3;
const OFFSET = 25;

const aPositions = new Array(PARTICLES_COUNT)
  .fill(0)
  .map(() => aPixelPos[Math.floor(Math.random() * aPixelPos.length)]);

const bPositions = new Array(PARTICLES_COUNT)
  .fill(0)
  .map(() => bPixelPos[Math.floor(Math.random() * bPixelPos.length)]);

const dist = (a, b) => Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2);
const costMatrix = aPositions.map(posA => bPositions.map(posB => dist(posA, posB)));
const affectations = munkres(costMatrix);

const positions = [];
for (let i = 0; i < PARTICLES_COUNT; i++) {
  const aPos = aPositions[i];
  const bPos = bPositions[affectations[i][1]];

  const rotation = Math.random() * Math.PI * 2;
  const timeMultiplicator = Math.sin(Math.random() * Math.PI * 2);
  const offsetMulitplicator = Math.sin(Math.random() * Math.PI * 2);

  positions.push({
    x1: aPos.x,
    x2: bPos.x,
    y1: aPos.y,
    y2: bPos.y,
    rotation,
    timeMultiplicator,
    offsetMulitplicator,
  });
}

let time = 0;
const draw = () => {
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.globalAlpha = 1;

  const mix = 0.5 * (1 + Math.cos(0.002 * time * Math.PI));
  positions.forEach(position => {
    const x = mix * position.x1 + (1 - mix) * position.x2;
    const y = mix * position.y1 + (1 - mix) * position.y2;

    const offsetX = Math.sin(position.rotation + 0.02 * time * position.timeMultiplicator);
    const offsetY = Math.cos(position.rotation + 2 * 0.02 * time * position.timeMultiplicator);

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(
      x - PARTICLE_SIZE / 2 + offsetX * OFFSET * position.offsetMulitplicator,
      y - PARTICLE_SIZE / 2 + offsetY * OFFSET * position.offsetMulitplicator,
      PARTICLE_SIZE,
      PARTICLE_SIZE
    );
  });

  time += 1;
  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
