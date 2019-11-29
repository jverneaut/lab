import imgSrc from './logo.svg';

const width = 1200;
const height = 1200;

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.fillRect(0, 0, width, height);

const img = new Image();
img.src = imgSrc;
img.onload = () => {
  const imgWidth = width / 1.5;
  const imgHeight = (img.height * imgWidth) / img.width;

  ctx.drawImage(
    img,
    0.5 * width - imgWidth / 2,
    0.5 * height - imgHeight / 2,
    imgWidth,
    imgHeight
  );

  const imgData = ctx.getImageData(0, 0, width, height);
  ctx.beginPath();
  ctx.fillRect(0, 0, width, height);

  const positions = [];

  for (let i = 0; i < imgData.data.length; i += 4) {
    const value = imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2];
    if (value >= 255 * 3) {
      positions.push({
        x: (i / 4) % width,
        y: Math.floor(i / 4 / width),
      });
    }
  }

  const PARTICLES_NUMBER = 5000;

  const particles = [];

  for (let i = 0; i < PARTICLES_NUMBER; i++) {
    const position = positions[Math.floor(Math.random() * positions.length)];
    particles.push({
      x: position.x,
      y: position.y,
      randomX: Math.random() * width,
      randomY: Math.random() * height,
      angle: Math.random() * Math.PI * 2,
      offset: Math.random() * Math.PI,
      time: 1 + Math.random(),
    });
  }

  let time = 0;

  const maxOffset = 8;
  const speed = 0.05;

  const draw = () => {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    const cursor = 0.5 * (Math.cos(time * 0.01) + 1);

    particles.forEach(particle => {
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.fillRect(
        cursor * particle.x +
          (1 - cursor) * particle.randomX +
          maxOffset *
            Math.cos(time * speed * particle.time + particle.offset) *
            Math.cos(particle.angle),
        cursor * particle.y +
          (1 - cursor) * particle.randomY +
          maxOffset *
            Math.sin(time * speed * particle.time + particle.offset) *
            Math.sin(particle.angle),
        2,
        2
      );
    });

    time += 1;
    requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
};
