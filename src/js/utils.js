/**
 * search form - related
 */

import WeatherAPI from './weatherApi';
import DomManipulation from './DomManipulation';

/**
 * variable for easier manipulation of inputStatus
 */
export const INPUT_STATES = {
  standby: 'standby',
  error: 'error',
  ready: 'ready',
  loading: 'loading',
  reload: 'reload',
};

/**
 * function verifies if the phrase in the input field matches some of the locations from API
 *
 * @param {array} cityList - array of locations given as a response from API
 * @param {DOM element} input - input which is currently being used in the app
 * @returns 'true' (if verification is positive) else 'false'
 */
export const verifyInput = (cityList, input) => {
  const cityMatch = cityList.find(
    ({ title }) => title.toLowerCase() === input.value.toLowerCase(),
  );

  if (cityMatch) {
    input.dataset.currentWoeid = cityMatch.woeid; // setting 'dataset.currentWoeid' at input
    input.dataset.currentCity = cityMatch.title; // setting 'dataset.currentCity' at input
    return true;
  } else {
    return false;
  }
};

/**
 * function for updating icons in the search form
 *
 * @param {DOM element} searchBar - current search form which is being used in the app
 * @param {String} status - current input status ('standby', 'loading', etc.)
 */
export const updateSearchFormDisplay = (searchBar, status) => {
  const icons = [...searchBar.querySelector('.search-icon-container').children];

  icons.forEach((icon) => {
    icon.classList.remove('active');
  });

  switch (status) {
    case 'standby':
      const standbyIcon = searchBar.querySelector('.fa-search');
      standbyIcon.classList.add('active');

      break;
    case 'loading':
      const loadingIcon = searchBar.querySelector('.lds-spinner');
      loadingIcon.classList.add('active');

      break;
    case 'error':
      const errorIcon = searchBar.querySelector('.fa-exclamation');
      errorIcon.classList.add('active');

      break;
    case 'ready':
      const readyIcon = searchBar.querySelector('.fa-check');
      readyIcon.classList.add('active');

      break;
    case 'reload':
      const reloadIcon = searchBar.querySelector('.fa-redo');
      reloadIcon.classList.add('active');

      break;
    default:
      console.log('unexpected input');
  }
};

// debounce function
// Originally inspired by  David Walsh (https://davidwalsh.name/javascript-debounce-function)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
export const debounce = (func, wait) => {
  let timeout;

  return function execFunc(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export let inputStatus = INPUT_STATES.standby;
const weather = new WeatherAPI();

/**
 * function validate input phrase, manage search form updating and sends request to API
 *
 * @param {Object} e - DOM event object
 * @returns nothing
 */

export const handleInput = async (e) => {
  const currentInput = e.target;
  const currentSearchBar = e.target.closest('form');
  const currentSearchInfo = currentSearchBar.querySelector(
    '.search-info-container p',
  );

  currentSearchInfo.innerText = '';

  if (!e.target.value) {
    inputStatus = INPUT_STATES.standby;
    updateSearchFormDisplay(currentSearchBar, inputStatus);
    return;
  }

  inputStatus = INPUT_STATES.loading;
  updateSearchFormDisplay(currentSearchBar, inputStatus);

  try {
    const res = await weather.getQueryLocations(e.target.value);
    if (res.length < 1) {
      console.log('No locations found');
      inputStatus = INPUT_STATES.error;
      updateSearchFormDisplay(currentSearchBar, inputStatus);
      currentSearchInfo.innerText = 'No results';

      return;
    }

    const dataList = new DomManipulation('results');
    dataList.setDatalistChildren(res);

    if (verifyInput(res, currentInput)) {
      inputStatus = INPUT_STATES.ready;
      updateSearchFormDisplay(currentSearchBar, inputStatus);
    } else {
      inputStatus = INPUT_STATES.standby;
      updateSearchFormDisplay(currentSearchBar, inputStatus);
    }
  } catch (error) {
    inputStatus = INPUT_STATES.reload;
    updateSearchFormDisplay(currentSearchBar, inputStatus);
    currentSearchInfo.innerText = 'Try again';
  }
};

export const clearInputBtn = (e) => {
  const form = e.target.closest('form');
  const input = form.querySelector('input');
  const searchInfo = form.querySelector('.search-info-container p');

  input.value = '';
  inputStatus = INPUT_STATES.standby;
  updateSearchFormDisplay(form, inputStatus);
  searchInfo.innerText = '';
};

/**
 * function for reseting both forms
 * needs to be invoked whenever the app view changes
 */
export const resetForms = () => {
  const homeSearchInput = new DomManipulation('home-input');
  const dailySearchInput = new DomManipulation('daily-input');

  const homeSearchBar = document.querySelector('.home-search-bar');
  const dailySearchBar = document.querySelector('.daily-search-bar');

  homeSearchInput.reset();
  dailySearchInput.reset();

  inputStatus = INPUT_STATES.standby;
  updateSearchFormDisplay(homeSearchBar, inputStatus);
  updateSearchFormDisplay(dailySearchBar, inputStatus);
};
