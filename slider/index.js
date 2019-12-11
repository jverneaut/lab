const container = document.querySelector('.cards');
const cards = document.querySelectorAll('.card');

let scroll = 0;
container.addEventListener('wheel', e => {
  scroll -= e.deltaX;
});

let start = 0;
let initialScroll = 0;
let mousedown = false;

['mousedown', 'touchstart'].forEach(eventName => {
  container.addEventListener(eventName, e => {
    start = e.clientX || e.touches[0].clientX;
    initialScroll = scroll;
    mousedown = true;
    container.style.cursor = 'grabbing';
  });
});

['mousemove', 'touchmove'].forEach(eventName => {
  container.addEventListener(eventName, e => {
    if (mousedown) {
      scroll = initialScroll + (e.clientX || e.touches[0].clientX) - start;
    }
  });
});

['mouseup', 'touchend'].forEach(eventName => {
  container.addEventListener(eventName, e => {
    mousedown = false;
    container.style.cursor = 'grab';
  });
});

let actualScroll = 0;
const anim = () => {
  actualScroll += (scroll - actualScroll) * 0.15;

  cards.forEach(card => {
    card.style.transform = `translateX(${actualScroll}px)`;
  });

  requestAnimationFrame(anim);
};
anim();
