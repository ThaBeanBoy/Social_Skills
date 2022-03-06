import './styles.scss';

import modulesInJSON from './comunicasi.json';

import { UI_Home_closeNoteReview } from './Js/UIelements';
import { Home_NoteReviewNotes } from './Js/pageManipulations';

// console.log('modules:', modules);
// console.log(timediff(new Date(2002, 2, 5), new Date(2022, 2, 5), 'D'));

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

// opening note reviews
UI_Home_closeNoteReview.addEventListener('click', () => {
  console.log('reverse');
  Home_NoteReviewNotes(false);
});

import './Js/moduleView';
import './Js/notesReview';
import './Js/home';
