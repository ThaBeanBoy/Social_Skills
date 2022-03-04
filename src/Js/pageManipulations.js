import gsap from 'gsap';
import {
  UIModuleView,
  UInoteReview,
  UIhome,
  UI_Home_allModulesBox,
  UI_NoteReview_moduleNoteReview,
} from './UIelements';

const animatinonDelay = 0.3;

export const Home_NoteReview = gsap.timeline({
  paused: true,
  delay: animatinonDelay,
  defaults: {
    duration: 0,
    ease: 'none',
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
Home_NoteReview.from(UI_NoteReview_moduleNoteReview, {
  translateX: '-125%',
  stagger: 0.25,

  ease: 'Expo.easeOut',
  duration: 0.2,
});

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
console.log(UIModuleView /* .nodeList */);
Home_ModuleView.from(Array.from(UIModuleView.childNodes).reverse(), {
  top: '-125%',
  stagger: 0.1,
  ease: 'Expo.easeOut',

  duration: 0.25,
});
