const boxes = document.querySelectorAll('.box');

const intersectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = entry.intersectionRatio;
      entry.target.style.transform = `scale(${0.5 + 0.5 * Math.sin(entry.intersectionRatio * Math.PI / 2)})`;
    }
  });
}, {
  root: null,
  threshold: new Array(100).fill(0).map((value, index) => index / 100),
  rootMargin: '0px',
});

boxes.forEach(box => {
  intersectionObserver.observe(box);
});
