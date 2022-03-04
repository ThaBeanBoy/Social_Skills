import './styles.scss';

import moduleViewCode from './Js/moduleView';
import homeCode from './Js/home';
import noteReviewCode from './Js/notesReview';

import { UI_Home_closeNoteReview } from './Js/UIelements';
import { Home_NoteReview } from './Js/pageManipulations';

moduleViewCode();
homeCode();
noteReviewCode();

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
UI_Home_closeNoteReview.addEventListener('click', () =>
  Home_NoteReview.reverse()
);
