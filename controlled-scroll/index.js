const wrapper = document.querySelector('.wrapper');

let scroll = 0;
let mouseX = 0;
let mouseY = 0;
let { height } = wrapper.getBoundingClientRect();

const setWrapperDim = () => {
  const dims = wrapper.getBoundingClientRect();
  width = dims.width;
  height = dims.height;
};

window.onresize = () => {
  setWrapperDim();
};

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

setWrapperDim();

wrapper.style.position = 'fixed';

document.onwheel = e => {
  scroll += e.deltaY;
  scroll = Math.max(0, scroll);
  scroll = Math.min(scroll, height - window.innerHeight);
};

let scrollLerp = scroll;
let mouseXLerp1 = mouseX;
let mouseYLerp1 = mouseY;
let mouseXLerp2 = mouseX;
let mouseYLerp2 = mouseY;

const mouse1 = document.querySelector('.mouse-1');
const mouse2 = document.querySelector('.mouse-2');

const animate = () => {
  scrollLerp += Math.floor(0.1 * (scroll - scrollLerp));
  wrapper.style.transform = `translate3d(0, ${-scrollLerp}px, 0)`;

  mouseXLerp1 += Math.floor(0.3 * (mouseX - mouseXLerp1));
  mouseYLerp1 += Math.floor(0.3 * (mouseY - mouseYLerp1));
  mouse1.style.transform = `translate3d(calc(-50% + ${mouseXLerp1}px), calc(-50% + ${mouseYLerp1}px), 0)`;

  mouseXLerp2 += Math.floor(0.2 * (mouseXLerp1 - mouseXLerp2));
  mouseYLerp2 += Math.floor(0.2 * (mouseYLerp1 - mouseYLerp2));
  mouse2.style.transform = `translate3d(calc(-50% + ${mouseXLerp2}px), calc(-50% + ${mouseYLerp2}px), 0)`;

  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
window.onload = setWrapperDim;

const images = document.querySelectorAll('.img-container');

const intersectionObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 2 * (entry.intersectionRatio - 0.5);
        entry.target.style.filter = 'contrast(0.5) grayscale(100%) sepia(0.2)';
      }
    });
  },
  {
    root: null,
    threshold: new Array(100).fill(0).map((value, index) => index / 100),
    rootMargin: '0px',
  }
);

let selected = -1;
images.forEach((image, index) => {
  intersectionObserver.observe(image);

  image.addEventListener('mouseover', () => {
    selected = index;
    mouse2.classList.add('mouse-2--big');
  });

  image.addEventListener('mouseout', () => {
    if (selected === index) {
      mouse2.classList.remove('mouse-2--big');
    }
  });
});
