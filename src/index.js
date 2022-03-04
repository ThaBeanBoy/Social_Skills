import './styles.scss';
import gsap from 'gsap';
import icon from './logo/logoSvg.svg';

import moduleViewCode from './Js/moduleView';
import {
  UIhome,
  UInoteReview,
  UI_Home_top,
  UI_Home_viewNotesBtn,
  UI_Home_allModulesBox,
  UI_Home_closeNoteReview,
} from './Js/UIelements';

moduleViewCode();

// Note review section UI elements

// Setting up service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.bundle.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Making the right side of all modules the same width
const rightSideWidth =
  gsap.getProperty('.unlocked .right-side', 'width') +
  gsap.getProperty('.module .right-side', 'padding-left');
const leftSideWidth =
  gsap.getProperty('.module .left-side', 'width') - rightSideWidth;
gsap.set('.module .right-side', { width: rightSideWidth });
gsap.set('.module .left-side', { width: leftSideWidth });

// appending logo on homescreen
const img = document.createElement('img');
img.src = icon;
UI_Home_top.appendChild(img);

// opening note reviews
const tl = gsap.timeline({
  paused: true,
  delay: 0.3,
  defaults: {
    duration: 0,
    ease: 'none',
  },
  onStart: () => {},
  onReverseComplete: () => {
    gsap.set(UInoteReview, { height: '0' });
  },
});
tl.to(UInoteReview, {
  padding: gsap.getProperty(UIhome, 'padding'),

  duration: 0,
});
tl.to(UInoteReview, {
  borderTop: 'solid 0.25rem black',

  duration: 0,
});
tl.to(
  UIhome,
  {
    filter: 'brightness(0.5)',
    ease: 'none',

    duration: 0.25,
  },
  '<'
);
tl.to(UInoteReview, {
  height:
    gsap.getProperty(UI_Home_allModulesBox, 'height') +
    gsap.getProperty(UI_Home_allModulesBox, 'padding-top'),

  ease: 'power4.out',
  duration: 1,
});

UI_Home_viewNotesBtn.addEventListener('click', () => tl.play());
UI_Home_closeNoteReview.addEventListener('click', () => tl.reverse());

// clicking locked modules

// clicking unlocked modules
