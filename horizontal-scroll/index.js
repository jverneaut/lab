const itemsContainer = document.querySelector('.items');
const items = document.querySelectorAll('.item');
const images = document.querySelectorAll('.item img');

const RATIO = 0.12;

let scroll = 0;
let actualScroll = scroll;

let containerWidth = itemsContainer.getBoundingClientRect().width;
let windowWidth = window.innerWidth;

window.onresize = () => {
  containerWidth = itemsContainer.getBoundingClientRect().width;
  windowWidth = window.innerWidth;
};

itemsContainer.addEventListener('wheel', e => {
  e.preventDefault();

  const delta = e.deltaX + e.deltaY;
  actualScroll = clamp(actualScroll + delta, 0, containerWidth - windowWidth);
});

const clamp = (value, min, max) => Math.min(max, Math.max(value, min));

const anim = () => {
  scroll += (actualScroll - scroll) * RATIO;

  itemsContainer.style.transform = `translate3d(${-scroll}px, 0, 0)`;

  const normalizedScroll = scroll / (containerWidth - windowWidth);
  images.forEach((image, index) => {
    const normalizedOffset = normalizedScroll - (index + 0.5) / images.length;
    image.style.transform = `translate3d(calc(-50% + ${normalizedOffset * 300}px), -50%, 0)`;
  });

  requestAnimationFrame(anim);
};

requestAnimationFrame(anim);
