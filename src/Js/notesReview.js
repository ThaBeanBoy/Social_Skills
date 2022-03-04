import gsap from 'gsap';
import { UI_NoteReview_moduleNoteReview } from './UIelements';

const noteReviewCode = () => {
  console.log(UI_NoteReview_moduleNoteReview);
  UI_NoteReview_moduleNoteReview.forEach((el) => {
    el.addEventListener('click', () => {
      let showing = el.dataset.showing === 'true';

      const duration = 0.5;
      showing
        ? gsap.to(el.querySelector('.note'), {
            height: 0,
            duration: duration,
          })
        : gsap.to(el.querySelector('.note'), {
            height: 'auto',
            duration: duration,
          });
      el.dataset.showing = !showing; //? tl.reverse() : tl.play();
    });
  });
};

export default noteReviewCode;
