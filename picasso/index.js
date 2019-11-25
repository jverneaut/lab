const width = document.body.clientWidth;
const height = document.body.clientHeight;

const svg = document.querySelector('svg');
svg.setAttribute('width', width);
svg.setAttribute('height', height);

const curvedPath = (x1, y1, x2, y2, offset = 0) => {
  const centerPointX = (x1 + x2) / 2;
  const centerPointY = (y1 + y2) / 2;

  const segmentRadians = Math.atan2(x2 - x1, y2 - y1) - Math.PI / 2;
  const handleRadians = segmentRadians + Math.PI / 2;

  const handleX = centerPointX + offset * Math.cos(handleRadians);
  const handleY = centerPointY - offset * Math.sin(handleRadians);

  return `T ${handleX} ${handleY}, ${x2} ${y2}`;
};

const OFFSET = 10 + Math.random() * 20;

const startX = Math.random() * width;
const startY = Math.random() * height;

const points = [{ x2: startX, y2: startY }];

const draw = () => {
  const path = points
    .map((point, index) =>
      index === 0
        ? { x1: startX, y1: startY, ...point }
        : { x1: points[index - 1].x2, y1: points[index - 1].y2, ...point }
    )
    .map((point, index) =>
      curvedPath(point.x1, point.y1, point.x2, point.y2, OFFSET * (index % 2 === 0 ? -1 : 1))
    )
    .join(' ');

  svg.innerHTML = `<path d="M${startX} ${startY} ${path}" stroke-width="2" stroke="black" fill="transparent"></path>`;
  requestAnimationFrame(draw);
};

draw();

window.addEventListener('mousemove', e => {
  points[points.length - 1].x2 = e.clientX;
  points[points.length - 1].y2 = e.clientY;
});

window.addEventListener('mousedown', e => {
  points.push({ x2: e.clientX, y2: e.clientY });
});
