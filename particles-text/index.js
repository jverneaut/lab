import { fromEvent } from 'rxjs';
import { map, scan } from 'rxjs/operators';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const input = fromEvent(window, 'keydown');

const text = input.pipe(
  map(e => e.key),
  scan((acc, curr) => {
    if (curr.length === 1) {
      return acc + curr;
    } else {
      if (curr === 'Backspace') {
        return acc.slice(0, acc.length - 1);
      } else {
        return acc;
      }
    }
  }, '')
);

const drawText = str => {
  context.beginPath();
  context.font = 'bold 240px sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(str, width / 2, height / 2);
};

const clear = () => {
  context.beginPath();
  context.clearRect(0, 0, width, height);
};

text.subscribe(value => {
  clear();
  drawText(value);
});
