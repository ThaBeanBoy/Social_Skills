import gsap from 'gsap';

import {
  Home_ModuleView,
  Home_NoteReview,
  alertBox,
} from './pageManipulations';

import {
  UI_Home_top,
  UI_Home_viewNotesBtn,
  UI_Alert_closeAlertion,
  UI_Home_allModulesBox,
} from './UIelements';

import icon from '../logo/logoSvg.svg';

import modules from '../comunicasi.json';

const strCompress = (markup, compress = true) => {
  // replace(/\s/g, '')
  return compress
    ? markup
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/\s+/g, ' ')
        .trim()
    : markup;
};

const moduleInStorage = (moduleTitle) => {
  return JSON.parse(localStorage.getItem(moduleTitle));
};

modules.forEach((module, indx) => {
  // get the number of meets from local storage
  let storage = moduleInStorage(module.id);
  if (storage === null) {
    const defaultVals = {
      numOfMeets: 0,
      fieldNotes: 'No notes made yet',
    };

    localStorage.setItem(module.id, JSON.stringify(defaultVals));
    storage = defaultVals;
  }

  //   Making the mark up
  const previousModule = modules[indx - 1];
  const unlocked =
    indx === 0 ||
    moduleInStorage(previousModule.id).numOfMeets ===
      previousModule.targetMeets ||
    module.language;

  const percantageProgress = (storage.numOfMeets / module.targetMeets) * 100;

  //   Making the li element
  const li = document.createElement('li');
  li.setAttribute('class', `module button ${unlocked ? 'unlocked' : 'locked'}`);
  li.setAttribute('data-module', `${module.id}`);
  //   prettier-ignore
  li.innerHTML = (strCompress(`
        <div class="left-side">
            <span class="module-name">${module.title}</span>
            <div class="progress-bar">
                <div class="progress-filler" style="width: ${percantageProgress}%"></div>
            </div>
        </div>
        <div class="right-side">
            ${unlocked?strCompress(`${storage.numOfMeets}<br />${percantageProgress} %`)
            :'<i class="icon-lock"></i>'}
        </div>
  `));

  if (indx === 0 || indx === 1) {
    console.log(li);
  }

  //   Adding the event
  li.addEventListener('click', () =>
    unlocked ? Home_ModuleView.play() : alertBox.play()
  );

  // Attaching the li element to the list
  UI_Home_allModulesBox.append(li);
});

// Making the right side of all modules the same width
const rightSideWidth =
  gsap.getProperty('.unlocked .right-side', 'width') +
  gsap.getProperty('.module .right-side', 'padding-left');
const leftSideWidth =
  gsap.getProperty('.module .left-side', 'width') - rightSideWidth;
gsap.set('.module .right-side', { width: rightSideWidth });
gsap.set('.module .left-side', { width: leftSideWidth });

// Increasing height of module view to create space for the review notes buttons
// const bottomPadding =
//   gsap.getProperty(UI_Home_viewNotesBtn, 'height') +
//   gsap.getProperty(UI_Home_viewNotesBtn, 'bottom') +
//   gsap.getProperty(UI_Home_viewNotesBtn, 'paddingBottom');
const bottomPadding =
  UI_Home_viewNotesBtn.offsetHeight +
  gsap.getProperty(UI_Home_viewNotesBtn, 'bottom') +
  20;

console.log(bottomPadding);

gsap.set(UI_Home_allModulesBox, { paddingBottom: bottomPadding });

// appending logo on homescreen
const img = document.createElement('img');
img.src = icon;
UI_Home_top.appendChild(img);

UI_Alert_closeAlertion.addEventListener('click', () => alertBox.reverse());

//   Setting transition for review notes
UI_Home_viewNotesBtn.addEventListener('click', () => Home_NoteReview.play());
