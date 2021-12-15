import './module1';
import './module2';
import WeatherAPI from './weatherApi';
import AppLocalStorage from './appLocalStorage';
import DomManipulation from './DomManipulation';

const weather = new WeatherAPI();
const localStorage = new AppLocalStorage();
const selectedElement = new DomManipulation('search-input');

const searchInput = new DomManipulation('home-input');
const homeView = new DomManipulation('home-view');
const searchView = new DomManipulation('search-view');
const dataList = new DomManipulation('results');

searchView.toggleDisplay();

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
  if (e.target.value) {
    const res = await weather.getQueryLocations(e.target.value);
    console.log(res);
    dataList.setDatalistChildren(res);
  }
};

searchInput.elem.addEventListener('keyup', debounce(handleInput, 1500));
