import WeatherAPI from './weatherApi';
import AppLocalStorage from './appLocalStorage';
import DomManipulation from './DomManipulation';
import {
  handleInput,
  debounce,
  INPUT_STATES,
  inputStatus,
  updateSearchFormDisplay,
  clearInputBtn,
  resetForms,
} from './utils';
import { navigateTo, render } from './router';

const weather = new WeatherAPI();

const homeSearchBar = document.querySelector('.home-search-bar');
const dailySearchBar = document.querySelector('.daily-search-bar');

const homeSearchInput = new DomManipulation('home-input');
const dailySearchInput = new DomManipulation('daily-input');

const clearBtns = document.querySelectorAll('.fa-times');
const reloadBtns = document.querySelectorAll('.fa-redo');

const searchView = new DomManipulation('search-view');

searchView.toggleDisplay();

updateSearchFormDisplay(homeSearchBar, inputStatus);

/**
 * function checks if the input is OK and proceeds with the further actions for displaying weather
 *
 * @param {Object} e - DOM event object
 * @returns nothing
 */
function handleSubmit(e) {
  e.preventDefault();

  if (inputStatus !== INPUT_STATES.ready) return;

  let input = this.getElementsByTagName('input')[0];
  navigateTo('search', {
    id: input.dataset.currentWoeid,
    title: input.dataset.currentCity,
  });
}

/**
 * event listeners for the search form on the home page
 */
homeSearchInput.elem.addEventListener('input', debounce(handleInput, 1500));
homeSearchBar.addEventListener('submit', handleSubmit);

/**
 * event listeners for the search form on the datails page
 */
dailySearchInput.elem.addEventListener('input', debounce(handleInput, 1500));
dailySearchBar.addEventListener('submit', handleSubmit);

/**
 * event listeners for clearing the input values after clicking the proper icon
 */
clearBtns.forEach((btn) => {
  btn.addEventListener('click', clearInputBtn);
});

/**
 * event listeners for reloading the page after clicking the proper icon
 */
reloadBtns.forEach((btn) => {
  btn.addEventListener('click', resetForms);
});

// Renders adequate view while traversing history
window.addEventListener('popstate', render);
// Renders adequate view on page load
document.addEventListener('DOMContentLoaded', () => render());
