import gsap from 'gsap';

import {
  Home_ModuleView,
  Home_NoteReviewNotes,
  alertBox,
} from './pageManipulations';

import {
  UI_Home_top,
  UI_Home_viewNotesBtn,
  UI_Alert_closeAlertion,
  UI_Home_allModulesBox,
} from './UIelements';

import html from './html';

import icon from '../logo/logoSvg.svg';

import modules from './storage';

modules.forEach((module, indx) => {
  const percantageProgress = (module.meets.length / module.targetMeets) * 100;
  const progressBarWidth = percantageProgress <= 100 ? percantageProgress : 100;

  const rightSideContent = module.unlocked
    ? percantageProgress < 100
      ? `${module.meets.length}<br />${percantageProgress} %`
      : '<i class="icon-ok"></i>'
    : '<i class="icon-lock"></i>';

  //   Making the li element
  const li = html({
    tag: 'li',
    attributes: {
      class: `module button ${module.unlocked ? 'unlocked' : 'locked'}`,
      'data-module': `${module.id}`,
    },
    markup: `
    <div class="left-side">
        <span class="module-name">${module.title}</span>
        <div class="progress-bar">
            <div class="progress-filler" style="width: ${progressBarWidth}%"></div>
        </div>
    </div>
    <div class="right-side">
        ${rightSideContent}
    </div>
    `,
    eventListeners: {
      click: () => (module.unlocked ? Home_ModuleView.play() : alertBox.play()),
    },
  });

  // Attaching the li element to the list
  UI_Home_allModulesBox.append(li);
});

// Making the right side of all modules the same width
// getting the widest .right-side
let RightSideWidth =
  Math.max(
    ...Array.from(document.querySelectorAll('.unlocked .right-side')).map(
      (el) => gsap.getProperty(el, 'width')
    )
  ) + gsap.getProperty('.module .right-side', 'padding-left');
gsap.set('.module .left-side', { width: RightSideWidth });

// Increasing height of module view to create space for the review notes buttons
const bottomPadding =
  UI_Home_viewNotesBtn.offsetHeight +
  gsap.getProperty(UI_Home_viewNotesBtn, 'bottom') +
  20;

gsap.set(UI_Home_allModulesBox, { paddingBottom: bottomPadding });

// appending logo on homescreen
const img = document.createElement('img');
img.src = icon;
UI_Home_top.appendChild(img);

UI_Alert_closeAlertion.addEventListener('click', () => alertBox.reverse());

//   Setting transition for review notes
UI_Home_viewNotesBtn.addEventListener('click', () => {
  console.log('play');
  Home_NoteReviewNotes(true);
});
