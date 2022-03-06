import Swiper from 'swiper';
import 'swiper/css';
import gsap from 'gsap';

import {
  UI_ModuleView_swiperHeadSwitcher,
  UI_ModuleView_backButton,
  UI_ModuleView_percantageProgression,
} from './UIelements';
import { Home_ModuleView } from './pageManipulations';

// const moduleViewCode = () => {
const progressionSquare = {
  width: gsap.getProperty(UI_ModuleView_percantageProgression, 'width'),
  height: gsap.getProperty(UI_ModuleView_percantageProgression, 'height'),
};

// making the back button same width as prgression thingy
gsap.set(UI_ModuleView_backButton, {
  width: progressionSquare.width,
  height: progressionSquare.height,
});

// making the incrementor and decrementor same width as progression square
gsap.set('.count-manipulator .button', {
  width: progressionSquare.width,
  height: progressionSquare.height,
});

// making the swiper-head-switcher same height as the other
gsap.set(UI_ModuleView_swiperHeadSwitcher, {
  // width: progressionSquare.width,
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
UI_ModuleView_backButton.addEventListener('click', () =>
  Home_ModuleView.reverse()
);
// };

// export default moduleViewCode;
