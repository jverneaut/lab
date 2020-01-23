const img = new Image();
img.src = require('./david-leveque-mempNtgR2Ug-unsplash.jpg');
img.onload = () => {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  document.body.appendChild(canvas);

  const context = canvas.getContext('2d');

  const tempCanvas = canvas.cloneNode();
  const tempContext = tempCanvas.getContext('2d');

  const data = [];
  for (let i = 0; i < 10; i++) {
    tempContext.clearRect(0, 0, W, H);
    tempContext.drawImage(img, 0, 0, W, H);

    const imgData = tempContext.getImageData(0, 0, W, H);

    tempContext.clearRect(0, 0, W, H);
    tempContext.beginPath();
    tempContext.fillStyle = 'red';
    tempContext.arc(W / 2, H / 2, (W * (i + 1)) / 10, 0, 2 * Math.PI);
    tempContext.fill();

    const circleData = tempContext.getImageData(0, 0, W, H);

    for (let i = 0; i < imgData.data.length; i += 4) {
      if (circleData.data[i + 3] !== 255) {
        imgData.data[i + 3] = 0;
      }
    }

    data.push(imgData);
  }

  const mousePos = [
    {
      x: 0,
      y: 0,
    },
  ];

  [('mouseenter', 'mousemove')].forEach(eventName => {
    document.addEventListener(eventName, e => {
      mousePos.push({ x: e.clientX, y: e.clientY });
    });
  });

  const anim = () => {
    context.clearRect(0, 0, W, H);
    mousePos.push(mousePos[mousePos.length - 1]);
    for (let i = 0; i < 10; i++) {
      const pos = mousePos[Math.max(mousePos.length - 1 - (10 - i) * 3, 0)];

      tempContext.putImageData(data[9 - i], 0, 0);
      context.drawImage(tempCanvas, pos.x - W / 2, pos.y - H / 2);
    }

    requestAnimationFrame(anim);
  };
  anim();
};
