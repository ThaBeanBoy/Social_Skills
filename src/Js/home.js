import gsap from 'gsap';

import {
  Home_ModuleView,
  Home_NoteReview,
  alertBox,
} from './pageManipulations';
import {
  UI_Home_top,
  UI_Home_allUnlockedModules,
  UI_Home_viewNotesBtn,
  UI_Home_allLockedModules,
  UI_Alert_closeAlertion,
} from './UIelements';
import icon from '../logo/logoSvg.svg';

const homeCode = () => {
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

  //   Setting up page transition to Module View
  UI_Home_allUnlockedModules.forEach((el) => {
    el.addEventListener('click', () => Home_ModuleView.play());
  });

  //   Alerting locked module
  UI_Home_allLockedModules.forEach((el) => {
    el.addEventListener('click', () => alertBox.play());
  });
  UI_Alert_closeAlertion.addEventListener('click', () => alertBox.reverse());

  //   Setting transition for review notes
  UI_Home_viewNotesBtn.addEventListener('click', () => Home_NoteReview.play());
};

export default homeCode;
