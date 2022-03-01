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

// appending logo on homescreen
const img = document.createElement('img');
img.src = icon;
UItop.appendChild(img);

// opening note reviews
UIviewNotesBtn.addEventListener('click', () => {
  //! Get a nice and proper height
  const homeHeight = UIallModulesBox.offsetHeight;
  const tl = gsap.timeline(/* { repeat: 1, repeatDelay: 1 } */);

  // body padding - 0.75rem
  tl.to(UInoteReview, {
    padding: sassBodyPadding,
    duration: 0,
  });
  tl.to(UInoteReview, {
    height: homeHeight,
    duration: 0.5,
  });
  tl.to(UInoteReview, {
    borderTop: 'solid 0.25rem black',
  });
});

// Closing notesReview

// clicking locked modules

// clicking unlocked modules
