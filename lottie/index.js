import lottie from 'lottie-web/build/player/lottie_light';
import { fromEvent, combineLatest } from 'rxjs';
import { map, startWith, throttleTime } from 'rxjs/operators';

import animationData from './ruban.json';

const anim = lottie.loadAnimation({
  container: document.querySelector('div'),
  animationData,
  renderer: 'svg',
  loop: true,
  autoplay: false,
});

const frameCount = animationData.op;

const resize$ = fromEvent(window, 'resize').pipe(throttleTime(200));

const bodyHeight$ = resize$.pipe(
  map(() => document.body.clientHeight),
  startWith(document.body.clientHeight)
);

const windowHeight$ = resize$.pipe(
  map(() => window.innerHeight),
  startWith(window.innerHeight)
);

const scroll$ = fromEvent(document, 'scroll').pipe(
  map(() => window.scrollY || document.body.scrollTop)
);

const normalizedScroll$ = combineLatest(
  bodyHeight$,
  windowHeight$,
  scroll$,
  (bodyHeight, windowHeight, scroll) => scroll / (bodyHeight - windowHeight)
);

normalizedScroll$.subscribe(normalizedScroll => {
  anim.goToAndStop((frameCount + 1) * normalizedScroll, true);
});
