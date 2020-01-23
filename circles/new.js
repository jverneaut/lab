const img = new Image();
// img.src = require('./david-leveque-mempNtgR2Ug-unsplash.jpg');
img.src = 'https://i.stack.imgur.com/RPEQQ.png';
img.onload = () => {
  const W = window.innerWidth;
  const H = window.innerHeight;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;

  const tempCanvas = canvas.cloneNode();
  const tempCtx = tempCanvas.getContext('2d');

  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  const mousePos = [0, 0];
  [('mouseenter', 'mousemove')].forEach(eventName => {
    document.addEventListener(eventName, e => {
      mousePos[0] = e.clientX;
      mousePos[1] = e.clientY;
    });
  });

  const imgDims = [img.width / 4, img.height / 4];

  const NUMBER_OF_CIRCLES = 10;

  const imgDatas = [];

  for (let i = 0; i < NUMBER_OF_CIRCLES; i++) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'red';
    ctx.arc(imgDims[0] / 2, imgDims[1] / 2, ((i + 1) * W) / 20, 0, 2 * Math.PI);
    ctx.fill();
    const circleData = ctx.getImageData(0, 0, W, H);

    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = 0.5;

    ctx.drawImage(img, 0, 0, imgDims[0], imgDims[1]);
    const imgData = ctx.getImageData(0, 0, W, H);

    // for (let i = 0; i < imgData.data.length; i += 4) {
    //   if (circleData.data[i] < 250) {
    //     imgData.data[i] = 0;
    //     imgData.data[i + 1] = 0;
    //     imgData.data[i + 2] = 0;
    //     imgData.data[i + 3] = 0;
    //   }
    // if ((i / 4) % 30 > 15) imgData.data[i + 3] = 0;
    // }

    imgDatas.push(imgData);
    ctx.clearRect(0, 0, W, H);
  }

  const lerpMousePos = new Array(NUMBER_OF_CIRCLES).fill([0, 0]);

  let time = 0;
  const anim = () => {
    ctx.clearRect(0, 0, W, H);

    // lerpMousePos[0][0] += 0.2 * (mousePos[0] - lerpMousePos[0][0]);
    // lerpMousePos[0][1] += 0.2 * (mousePos[1] - lerpMousePos[0][1]);

    // lerpMousePos[1][0] += 0.01 * (mousePos[0] - lerpMousePos[1][0]);
    // lerpMousePos[1][1] += 0.01 * (mousePos[1] - lerpMousePos[1][1]);

    // tempCtx.globalAlpha = 0;
    // tempCtx.putImageData(
    //   imgDatas[4],
    //   lerpMousePos[1][0] - imgDims[0] / 2,
    //   lerpMousePos[1][1] - imgDims[1] / 2
    // );
    // ctx.drawImage(tempCanvas, 0, 0);

    // tempCtx.clearRect(0, 0, W, H);
    // tempCtx.globalAlpha = 0;
    // tempCtx.putImageData(
    //   imgDatas[0],
    //   lerpMousePos[0][0] - imgDims[0] / 2,
    //   lerpMousePos[0][1] - imgDims[1] / 2
    // );
    // ctx.drawImage(tempCanvas, 0, 0);
    tempCtx.putImageData(imgDatas[4], mousePos[0] + 100, mousePos[1] + 200);
    ctx.drawImage(tempCanvas, 0, 0);

    time += 1;
    requestAnimationFrame(anim);
  };
  anim();

  // const anim = () => {
  //   ctx.clearRect(0, 0, W, H);

  //   lerpMousePos.forEach((pos, index) => {
  //     lerpMousePos[index][0] += Math.pow(0.1, index) * (mousePos[0] - lerpMousePos[index][0]);

  //     // pos[0] += Math.pow(index / 4, 2) * (mousePos[0] - pos[0]);
  //     // console.log(Math.pow(0.1, index));
  //     // pos[1] += 0.5 * (index / 2) * (mousePos[1] - pos[1]);
  //     // lerpMousePos[1] = mousePos[1];

  //     tempCtx.clearRect(0, 0, W, H);
  //     tempCtx.putImageData(
  //       imgDatas[NUMBER_OF_CIRCLES - 1 - index],
  //       lerpMousePos[index][0] - imgDims[0] / 2,
  //       pos[1] - imgDims[1] / 2
  //     );

  //     ctx.drawImage(tempCanvas, 0, 0);
  //   });

  //   requestAnimationFrame(anim);
  // };
  // anim();
};
