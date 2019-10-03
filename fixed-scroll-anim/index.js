const scrollHeight = 500;
const section = document.querySelector('.full-screen');

const sectionTop = section.getBoundingClientRect().top + window.scrollY;
const items = section.querySelectorAll('.item');

const body = document.querySelector('body');
const container = document.querySelector('.container');

const sectionHeight =
  container.getBoundingClientRect().height + scrollHeight * items.length;
body.style.height = sectionHeight + 'px';

const clamp = (number, min, max) => {
  return Math.min(max, Math.max(min, number));
};

window.onscroll = () => {
  if (window.scrollY > sectionTop) {
    if (window.scrollY > sectionTop + sectionHeight - window.innerHeight) {
      section.classList.remove('fixed');
      section.style.top =
        sectionTop + sectionHeight - window.innerHeight + 'px';
    } else {
      section.style.top = '';
      section.classList.add('fixed');
    }
  } else {
    section.style.top = '';
    section.classList.remove('fixed');
  }

  const normalizedScroll = clamp(
    (window.scrollY - sectionTop) /
      (sectionHeight - window.innerHeight + scrollHeight),
    0,
    1
  );
  const itemsScroll = clamp(
    1 + normalizedScroll * items.length,
    1,
    items.length
  );

  const current = Math.floor(itemsScroll - 0.5);
  const prev = current - 1;
  const next = current + 1;

  document.querySelector('.indicator').innerHTML = current + 1;

  const animated = [current, prev, next];

  items.forEach((item, index) => {
    if (animated.includes(index)) {
      const itemScroll = clamp(itemsScroll - index - 0.5, 0, 1) / 1;
      item.style.opacity =
        clamp(Math.sin(itemScroll * Math.PI), 0, 0.75) * 1.33;
      const offsetX = 32 - Math.sin(itemScroll * Math.PI) * 32;
      const offsetY = -scrollHeight * itemScroll + scrollHeight / 2;
      item.style.transform = `translate(${offsetX}px, calc(-50% + ${offsetY}px))`;
    }
  });
};
