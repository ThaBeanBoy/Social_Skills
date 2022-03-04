import Swiper from 'swiper';
import 'swiper/css';

import { UI_ModuleView_swiperHeadSwitcher } from './UIelements';

const moduleViewCode = () => {
  const swiper = new Swiper('.big-block', {
    effect: 'fade',

    on: {
      slideChange: () => {
        // console.log(UI_ModuleView_swiperHeadSwitcher.childNodes);
        if (swiper.activeIndex === 0) {
          UI_ModuleView_swiperHeadSwitcher.childNodes[0].classList.add(
            'active'
          );
          UI_ModuleView_swiperHeadSwitcher.childNodes[1].classList.remove(
            'active'
          );
        } else {
          UI_ModuleView_swiperHeadSwitcher.childNodes[1].classList.add(
            'active'
          );
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

  // console.log(swi);
};

export default moduleViewCode;
