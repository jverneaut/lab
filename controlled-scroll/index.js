const wrapper = document.querySelector('.wrapper');

let scroll = 0;
let mouseX = 0;
let mouseY = 0;
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

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

setWrapperDim();

wrapper.style.position =  'fixed';

window.onscroll = () => {
  scroll = window.scrollY;
}

let scrollLerp = scroll;
let mouseXLerp1 = mouseX;
let mouseYLerp1 = mouseY;
let mouseXLerp2 = mouseX;
let mouseYLerp2 = mouseY;

const mouse1 = document.querySelector('.mouse-1');
const mouse2 = document.querySelector('.mouse-2');

const animate = () => {
  scrollLerp += 0.1 * (scroll - scrollLerp);
  wrapper.style.top = -scrollLerp + 'px';

  mouseXLerp1 += 0.3 * (mouseX - mouseXLerp1);
  mouseYLerp1 += 0.3 * (mouseY - mouseYLerp1);
  mouse1.style.left = mouseXLerp1 + 'px';
  mouse1.style.top = mouseYLerp1 + 'px';


  mouseXLerp2 += 0.2 * (mouseXLerp1 - mouseXLerp2);
  mouseYLerp2 += 0.2 * (mouseYLerp1 - mouseYLerp2);
  mouse2.style.left = mouseXLerp2 + 'px';
  mouse2.style.top = mouseYLerp2 + 'px';

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

