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

import { moduleViewElements } from './moduleView';

import html from './html';

import icon from '../logo/logoSvg.svg';

import modules from './storage';

const renderHome = () => {
  UI_Home_allModulesBox.innerHTML = '';

  modules().forEach((module) => {
    const percantageProgress = (module.meets.length / module.targetMeets) * 100;
    const progressBarWidth =
      percantageProgress <= 100 ? percantageProgress : 100;

    const rightSideContent = module.unlocked
      ? percantageProgress < 100
        ? `${module.meets.length}<br />${percantageProgress.toFixed(1)} %`
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
        click: () => {
          if (module.unlocked) {
            // Switching up details
            moduleViewElements.moduleNameHeader.innerText = module.title;

            moduleViewElements.percantageProgressionBox.innerHTML =
              percantageProgress >= 100
                ? '<i class="icon-ok"></i>'
                : `${percantageProgress.toFixed(1)}%`;

            moduleViewElements.meetsBox.innerHTML = `Meets: <span id="displayedNumOfMeets">${module.meets.length}</span>/${module.targetMeets}`;
            moduleViewElements.textField.value = module.fieldNotes;

            //

            moduleViewElements.textField.dataset.module = module.id;
            moduleViewElements.incrementor.dataset.module = module.id;
            moduleViewElements.decrementor.dataset.module = module.id;

            // Openig module view
            Home_ModuleView.play();
          } else {
            alertBox.play();
          }
        },
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
  gsap.set('.module .right-side', { width: RightSideWidth });

  console.log('fattest', RightSideWidth);
  // Increasing height of module view to create space for the review notes buttons
  const bottomPadding =
    UI_Home_viewNotesBtn.offsetHeight +
    gsap.getProperty(UI_Home_viewNotesBtn, 'bottom') +
    20;

  gsap.set(UI_Home_allModulesBox, { paddingBottom: bottomPadding });
};

renderHome();

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

export default renderHome;
