import './module1';
import './module2';
import WeatherAPI from './weatherApi';
import AppLocalStorage from './appLocalStorage';
import DomManipulation from './DomManipulation';
import { navigateTo, render } from './router';

const weather = new WeatherAPI();
const localStorage = new AppLocalStorage();

const searchInput = new DomManipulation('home-input');
const dataList = new DomManipulation('results');

// debounce function
// Originally inspired by  David Walsh (https://davidwalsh.name/javascript-debounce-function)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
const debounce = (func, wait) => {
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

const handleInput = async (e) => {
  if (e.target.value && e.key !== 'Enter') {
    const res = await weather.getQueryLocations(e.target.value);
    console.log(res);
    dataList.setDatalistChildren(res);
  }
};

searchInput.elem.addEventListener('keyup', debounce(handleInput, 500));

// Renders adequate view while traversing history
window.addEventListener('popstate', render);
// Renders adequate view on page load
document.addEventListener('DOMContentLoaded', () => render());

document.querySelector('#home-input').addEventListener('keydown', (e) => {
  e.preventDefault();
  navigateTo('search', {
    id: input.dataset.currentWoeid,
    title: input.dataset.currentCity,
  });
});
