import gsap from 'gsap';
import {
  UIModuleView,
  UInoteReview,
  UIhome,
  UI_Home_allModulesBox,
  UI_NoteReview_moduleNoteReview,
  UI_Alert_alerBox,
  UI_Alert_alert,
} from './UIelements';

const animatinonDelay = 0.3;

export const Home_NoteReviewNotes = (play) => {
  console.log('awes');
  const Home_NoteReview = gsap.timeline({
    paused: true,
    delay: animatinonDelay,
    defaults: {
      duration: 0,
      ease: 'none',
    },
    onReverseComplete: () => {
      gsap.set(UInoteReview, { height: 0, padding: 0 });
    },
    onStart: () => {},
    onReverseComplete: () => {
      gsap.set(UInoteReview, { height: '0' });
    },
  });
  Home_NoteReview.to(UInoteReview, {
    padding: gsap.getProperty(UIhome, 'padding'),

    duration: 0,
  });
  Home_NoteReview.to(UInoteReview, {
    borderTop: 'solid 0.25rem black',

    duration: 0,
  });
  Home_NoteReview.to(
    UIhome,
    {
      filter: 'brightness(0.5)',
      ease: 'none',

      duration: 0.25,
    },
    '<'
  );
  Home_NoteReview.to(UInoteReview, {
    height:
      gsap.getProperty(UI_Home_allModulesBox, 'height') +
      gsap.getProperty(UI_Home_allModulesBox, 'padding-top'),

    // ease: 'power4.out',
    ease: 'Expo.easeOut',
    duration: 0.5,
  });
  Home_NoteReview.from(document.querySelectorAll('.moduleNoteReview'), {
    translateX: '-125%',
    stagger: 0.1,

    ease: 'Expo.easeOut',
    duration: 0.1,
  });

  console.log('should be playing', play);
  if (play) {
    console.log('play');
    Home_NoteReview.play();
  } else {
    console.log('reverse');

    Home_NoteReview.reverse();
  }
};

export const Home_ModuleView = gsap.timeline({
  paused: true,
  delay: 0.5,
  defaults: {
    duration: 0,
    ease: 'none',
  },
});
Home_ModuleView.to(UIModuleView, {
  // transform: 'translateX(0)',
  height: '100%',
  padding: gsap.getProperty(UIhome, 'padding'),

  duration: 0.25,
});
Home_ModuleView.from(Array.from(UIModuleView.childNodes).reverse(), {
  top: '-125%',
  stagger: 0.1,
  ease: 'Expo.easeOut',

  duration: 0.25,
});

export const alertBox = gsap.timeline({
  paused: true,
  delay: animatinonDelay,
  defaults: {
    duration: 0,
    ease: 'none',
  },
});
alertBox.to(UI_Alert_alerBox, {
  height: '100vh',

  duration: 0,
});
alertBox.to(UI_Alert_alerBox, {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',

  duration: 0.25,
});
alertBox.from(UI_Alert_alert, {
  translateY: '-200%',

  duration: 0.1,
});
