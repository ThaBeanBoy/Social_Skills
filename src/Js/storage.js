import moment from 'moment';
import timediff from 'timediff';

import modulesInJSON from '../comunicasi.json';

const modules = () => {
  return modulesInJSON.map((moduleInJSON, indx) => {
    // Module default details
    let module = moduleInJSON;
    // Other details needed
    let inLclStrg = JSON.parse(localStorage.getItem(module.id));
    if (inLclStrg === null) {
      const defaultVals = {
        meets: [],
        numOfMeets: 0,
        fieldNotes: 'No notes made yet',
      };

      localStorage.setItem(module.id, JSON.stringify(defaultVals));
      inLclStrg = JSON.parse(localStorage.getItem(module.id));
    }

    module = { ...module, ...inLclStrg };
    const completedModule = module.meets.length / module.targetMeets === 1;

    // Deleting all meets based on date things
    const shouldEraseMeets = () => {
      if (!completedModule && module.meets.length > 0) {
        console.log('shouldEraseMeets');
        // totalActiveDays > current date - first save
        const firstSave_to_today = timediff(
          module.meets[module.meets.length - 1],
          new Date()
        ).days;
        const lastSave_to_today = timediff(module.meets[0], new Date()).days;

        const exceededTotalDaysForModule =
          firstSave_to_today >= module.moduleDayDuration;
        const inactiveForTooLong =
          lastSave_to_today >= module.inactiveDaysAllowed;

        if (inactiveForTooLong || exceededTotalDaysForModule) {
          // alert('Meets should be erased');
          // module.meets = [];
        }

        if (indx === 0) {
          console.log('inactiveForTooLong', inactiveForTooLong);
          console.log('last save', module.meets[0]);
          console.table({
            inactaveDaysAllowed: module.inactiveDaysAllowed,
            lastSave_to_today: lastSave_to_today,
          });

          console.log(
            '\nexceededTotalDaysForModule',
            exceededTotalDaysForModule
          );
          console.log('first save', module.meets[module.meets.length - 1]);
          console.table({
            moduleDuration: module.moduleDayDuration,
            firstSave_to_today: firstSave_to_today,
          });
        }
        // }
      }
    };

    shouldEraseMeets();

    // helper functions
    const helperFunctions = {
      save: () => localStorage.setItem(module.id, JSON.stringify(module)),

      incr: (date = new Date()) => {
        // save changes in date
        module.meets.unshift(date);
        module.numOfMeets += 1;

        module.save();
      },

      decr: (meetsClear) => {
        if (meetsClear) {
          module.meets.shift();
          module.numOfMeets -= module.numOfMeets >= 0 ? 1 : 0;

          shouldEraseMeets();

          module.save();
        }
      },

      setNumOfMeets: (num) => {
        if (num >= 0) {
          module.meets = [];

          for (let i = 0; i < num; i++) {
            module.meets.push(new Date());
          }
          module.numOfMeets = num;

          module.save();
          // save changes in date
          //! changes to the home
        }
      },

      saveFieldNotes: (string) => {
        module.fieldNotes = string;
        module.save();
      },
    };
    module = {
      ...module,
      ...helperFunctions,
    };

    // unlocked status
    let unlocked = false;
    if (indx >= 1) {
      const prevModule = {
        ...modulesInJSON[indx - 1],
        ...JSON.parse(localStorage.getItem(modulesInJSON[indx - 1].id)),
      };

      const isLanguage = module.language;
      const prevModuleDone = prevModule.meets.length >= prevModule.targetMeets;

      if (isLanguage || prevModuleDone) {
        unlocked = true;
      }
    } else {
      unlocked = true;
    }

    module.unlocked = unlocked;

    return module;
  });
};

//! For dev purposes
// console.log(modules());
// modules()[0].incr(new Date(2022, 2, 6));

export default modules;
