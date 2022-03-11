import Swiper from 'swiper';
import 'swiper/css';
import gsap from 'gsap';

import {
  UI_ModuleView_swiperHeadSwitcher,
  UI_ModuleView_backButton,
  UI_ModuleView_percantageProgression,
} from './UIelements';

import { Home_ModuleView } from './pageManipulations';

import modules from './storage';

import renderHome from './home';

export const moduleViewElements = {
  moduleNameHeader: document.querySelector('.moduleView .module-name'),

  percantageProgressionBox: document.querySelector(
    '.moduleView #percantage-progression'
  ),

  meetsBox: document.querySelector('.moduleView .count-manipulator #details'),

  incrementor: document.querySelector('.moduleView #incrementor'),

  decrementor: document.querySelector('.moduleView #decrementer'),

  displayedNumOfMeets: document.querySelector(
    '.moduleView #displayedNumOfMeets'
  ),

  textField: document.querySelector('.moduleView #field-notes-text-area'),
};

export const ModuleView_decrementor = document.querySelector(
  '.moduleView #decrementer'
);

export const ModuleView_fieldNotesTextBox = document.querySelector(
  '.moduleView #field-notes-text-area'
);

const progressionSquare = {
  width: gsap.getProperty('.moduleView #percantage-progression', 'width'),
  height: gsap.getProperty('.moduleView #percantage-progression', 'height'),
};

// making the back button same width as prgression thingy
gsap.set(UI_ModuleView_backButton, {
  width: progressionSquare.width,
  height: progressionSquare.height,
});

// making the incrementor and decrementor same width as progression square
gsap.set('.count-manipulator .button', {
  width: progressionSquare.width,
});

// making the swiper-head-switcher same height as the other
gsap.set(UI_ModuleView_swiperHeadSwitcher, {
  height: progressionSquare.height,
});

// Setting up the swiper thingy
const swiper = new Swiper('.big-block', {
  effect: 'fade',

  on: {
    slideChange: () => {
      // console.log(UI_ModuleView_swiperHeadSwitcher.childNodes);
      if (swiper.activeIndex === 0) {
        UI_ModuleView_swiperHeadSwitcher.childNodes[0].classList.add('active');
        UI_ModuleView_swiperHeadSwitcher.childNodes[1].classList.remove(
          'active'
        );
      } else {
        UI_ModuleView_swiperHeadSwitcher.childNodes[1].classList.add('active');
        UI_ModuleView_swiperHeadSwitcher.childNodes[0].classList.remove(
          'active'
        );
      }
    },
  },
});

UI_ModuleView_swiperHeadSwitcher.childNodes.forEach((el, indx) => {
  el.addEventListener('click', () => swiper.slideTo(indx));
});

// Setting up page transition
UI_ModuleView_backButton.addEventListener('click', () => {
  Home_ModuleView.reverse();
  renderHome();
});

// Setting the event listeners
const moduleBeingAffected = (moduleId) => {
  return modules().filter((module) => module.id === moduleId)[0];
};

const changesToUI = (evt) => {
  const module = moduleBeingAffected(evt.target.dataset.module);
  const percantageProgress = (module.meets.length / module.targetMeets) * 100;
  const displayedNumOfMeets = document.querySelector(
    '.moduleView #displayedNumOfMeets'
  );

  displayedNumOfMeets.innerText = module.meets.length;
  console.log(percantageProgress);
  moduleViewElements.percantageProgressionBox.innerHTML =
    percantageProgress >= 100
      ? '<i class="icon-ok"></i>'
      : `${percantageProgress.toFixed(1)}%`;

  // making the back button same width as prgression thingy
  gsap.set(UI_ModuleView_backButton, {
    width: progressionSquare.width,
    height: progressionSquare.height,
  });
};

moduleViewElements.incrementor.addEventListener('click', (evt) => {
  const module = moduleBeingAffected(evt.target.dataset.module);

  // Incrementing in memory
  module.incr();

  changesToUI(evt);
});

moduleViewElements.decrementor.addEventListener('click', (evt) => {
  const module = moduleBeingAffected(evt.target.dataset.module);

  module.decr(confirm('Are you sure, your meets could be erased'));

  changesToUI(evt);
});

moduleViewElements.textField.addEventListener('input', (evt) => {
  const module = moduleBeingAffected(evt.target.dataset.module);
  const newNote = evt.target.value;

  module.saveFieldNotes(newNote);
});
