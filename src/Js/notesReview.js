import gsap from 'gsap';
import {
  UI_NoteReview_moduleNoteReview,
  UI_NoteReview_noteReviewsList,
} from './UIelements';

import modules from './storage';

import html from './html';

// Attaching module to note review
modules().forEach((module, indx) => {
  // Attaching the element to li
  UI_NoteReview_noteReviewsList.append(
    html({
      tag: 'li',
      attributes: {
        class: 'moduleNoteReview button',
        'data-showing': false,
      },
      // prettier-ignore
      markup: `
        <div class="moduleNoteReviewTop">
          <span class="module-name">${module.title}</span>
          <i id="showing-indicator" class="icon-left-open"></i>
        </div>

        <p class="note">${module.notes}</p>
      `,
    })
  );
});

document.querySelectorAll('.moduleNoteReview').forEach((el) => {
  el.addEventListener('click', () => {
    let showing = el.dataset.showing === 'true';

    const duration = 0.5;
    if (showing) {
      // closing the box
      gsap.to(el.querySelector('.note'), {
        height: 0,
        duration: duration,
      });

      gsap.to(el.querySelector('#showing-indicator'), {
        rotate: '90deg',
        duration: duration,
      });
    } else {
      // opening the box
      gsap.to(el.querySelector('.note'), {
        height: 'auto',
        duration: duration,
      });

      gsap.to(el.querySelector('#showing-indicator'), {
        rotate: '-90deg',
        duration: duration,
      });
    }

    el.dataset.showing = !showing; //? tl.reverse() : tl.play();
  });
});
