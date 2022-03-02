import './styles.scss';
import gsap from 'gsap';
import icon from './logo/logoSvg.svg';

// Sass values
const sassBodyPadding = '0.75rem';

// Sections
const UIhome = document.querySelector('.home');
const UInoteReview = document.querySelector('.noteReview');

// Home section UI elements
const UItop = document.querySelector('.top');
const UIviewNotesBtn = document.querySelector('#viewNotes');
const UIallModulesBox = document.querySelector('.allModules');
const UIallModules = document.querySelectorAll('.module');
const UIallUnlockedModules = document.querySelectorAll('.unlocked');
const UIallLockedModules = document.querySelectorAll('.locked');

// Notes review UI elements
const UIcloseNoteReview = document.querySelector('#closeNoteReview');
const UInoteReviewsList = document.querySelector('.noteReviewsList');

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
UItop.appendChild(img);

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
    gsap.getProperty(UIallModulesBox, 'height') +
    gsap.getProperty(UIallModulesBox, 'padding-top'),

  ease: 'power4.out',
  duration: 1,
});

UIviewNotesBtn.addEventListener('click', () => tl.play());
UIcloseNoteReview.addEventListener('click', () => tl.reverse());

// clicking locked modules

// clicking unlocked modules
