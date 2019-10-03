const body = document.querySelector('body');
const content = document.querySelector('.content');

const webkitOverflowScrolling = document.querySelector('#webkit');
const vhJavascript = document.querySelector('#vh');

webkitOverflowScrolling.addEventListener('change', () => {
  if (webkitOverflowScrolling.checked) {
    content.style.WebkitOverflowScrolling = 'touch';
  } else {
    content.style.WebkitOverflowScrolling = '';
  }
});

const setHeight = () => {
  body.style.height = window.innerHeight + 'px';
};

vhJavascript.addEventListener('change', () => {
  if (vhJavascript.checked) {
    setHeight();
    window.addEventListener('resize', setHeight);
  } else {
    body.style.height = '';
    window.removeEventListener('resize', setHeight);
  }
});
