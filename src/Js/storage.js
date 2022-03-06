import moment from 'moment';
import timediff from 'timediff';

import modulesInJSON from '../comunicasi.json';

const modules = modulesInJSON.map((moduleInJSON, indx) => {
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

  // helper functions
  const helperFunctions = {
    save: () => {
      // Remove functions cause  local storage doesn't do well with functions
      let duplicate = module;

      for (const property in helperFunctions) {
        delete duplicate[property];
      }

      localStorage.setItem(module.id, JSON.stringify(duplicate));
    },

    incr: () => {
      // save changes in date
      module.meets.unshift(new Date());
      module.numOfMeets += 1;

      module.save();
      //! changes to the home
    },

    decr: () => {
      module.meets.shift();
      module.numOfMeets -= module.numOfMeets >= 0 ? 1 : 0;

      module.save();

      //! Check lockedness based on the latest date

      // save changes in date
      //! changes to the home
    },

    setNumOfMeets: (num) => {
      if (num >= 0) {
        for (let i = 0; i <= num; i++) {
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

  // Deleting all meets based on date things
  if (!completedModule && module.meets.length > 0) {
    // totalActiveDays > current date - first save
    const firstSave_to_today = timediff(
      module.meets[module.meets.length - 1],
      new Date()
    );
    const lastSave_to_today = timediff(module.meets[0], new Date());

    const exceededTotalDaysForModule =
      module.moduleDayDuration > firstSave_to_today;
    const inactiveForTooLong = module.inactiveDaysAllowed > lastSave_to_today;
    if (inactiveForTooLong || exceededTotalDaysForModule) {
      alert('Meets erased');
      module.meets = [];
    }
  }

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

export default modules;
