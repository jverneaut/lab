const svg = document.querySelector('svg');

let scroll = 0;
let currentScroll = 0;

let height = window.innerHeight;

window.onscroll = function() {
  scroll = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;
};

document.onresize = function() {
  height = window.innerHeight;
};

const draw = function() {
  currentScroll += (scroll - currentScroll) * 0.2;
  svg.style.strokeDashoffset =
    Math.max(Math.min(1600 - (currentScroll / height - 0.5) * 1600, 1600), 0) + 'px';

  window.requestAnimationFrame(draw);
};

window.requestAnimationFrame(draw);
