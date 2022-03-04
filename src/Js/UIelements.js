const UI = (str, all = false) => {
  return all ? document.querySelectorAll(str) : document.querySelector(str);
};
export const UIhome = UI('.home');
export const UInoteReview = UI('.noteReview');

// Home section UI elements
export const UI_Home_top = UI('.home .top');
export const UI_Home_viewNotesBtn = UI('#viewNotes');
export const UI_Home_allModulesBox = UI('.allModules');
export const UI_Home_allModules = UI('.module', true);
export const UI_Home_allUnlockedModules = UI('.unlocked', true);
export const UI_Home_allLockedModules = UI('.locked', true);
export const UI_Home_closeNoteReview = UI('#closeNoteReview');
// };

// Note review UI elements
export const UI_NoteReview_noteReviewsList = UI('.noteReviewsList');

// Note review UI elements
export const UI_ModuleView_swiperHeadSwitcher = UI('.swiper-head-switcher');
