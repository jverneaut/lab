const wrapper = document.querySelector('.wrapper');

let scroll = 0;
let { height } = wrapper.getBoundingClientRect();

const setWrapperDim = () => {
  const dims = wrapper.getBoundingClientRect();
  width = dims.width;
  height = dims.height;
  document.body.style.height = height + 'px';
}

window.onresize = () => {
  setWrapperDim();
}

setWrapperDim();

wrapper.style.position =  'fixed';

window.onscroll = () => {
  scroll = window.scrollY;
}

let scrollLerp = scroll;
const animate = () => {
  scrollLerp += 0.1 * (scroll - scrollLerp)
  wrapper.style.top = -scrollLerp + 'px';

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
window.onload = setWrapperDim;

const images = document.querySelectorAll('.img-container');

const intersectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 2 * (entry.intersectionRatio - 0.5);
    }
  });
}, {
  root: null,
  threshold: new Array(100).fill(0).map((value, index) => index / 100),
  rootMargin: '0px',
});

images.forEach(box => {
  intersectionObserver.observe(box);
});

