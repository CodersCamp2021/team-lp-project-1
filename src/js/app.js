import './module1';
import './module2';
import WeatherAPI from './weatherApi';
import AppLocalStorage from './appLocalStorage';
import DomManipulation from './DomManipulation';

const weather = new WeatherAPI();
const localStorage = new AppLocalStorage();

const inputForm = document.querySelector('.home-search-bar');
const searchInput = new DomManipulation('home-input');
const homeView = new DomManipulation('home-view');
const searchView = new DomManipulation('search-view');
const dataList = new DomManipulation('results');

searchView.toggleDisplay();

let isLoading = false;

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
  if (e.target.value) {
    setInputLoading(e.target);
    const res = await weather.getQueryLocations(e.target.value);
    if (res.length < 1) {
      console.log('No locations found');
    }
    setInputLoading(e.target);
    dataList.setDatalistChildren(res);
  }
};

searchInput.elem.addEventListener('input', debounce(handleInput, 1500));

// Provisional screen switcher - subject to change, made to allow
// working on other features.

inputForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let datalistOptions = this.getElementsByTagName('datalist')[0].children;
  let input = this.getElementsByTagName('input')[0];
  if (verifyInput(datalistOptions, input)) {
    screenSwitch(input.dataset.currentWoeid);
  }
});

const screenSwitch = async (locationID) => {
  weather.getWeatherData(locationID).then((weatherData) => {
    console.log(weatherData);
    homeView.toggleDisplay();
    searchView.toggleDisplay();
  });
};

const verifyInput = (options, input) => {
  // need a visual indicator if it didn't find a match
  console.log(options);
  const cityList = Array.from(options).map((option) => ({
    // Creating an array of { cityName, ID } objects
    title: option.value,
    woeid: option.dataset.woeid,
  }));

  const cityMatch = cityList.find(
    ({ title }) => title.toLowerCase() === input.value.toLowerCase(),
  );

  if (cityMatch) {
    input.dataset.currentWoeid = cityMatch.woeid; // setting current woeid of input to be that of matched city
    return true;
  } else {
    return false;
  }
};

const setInputLoading = (input) => {
  isLoading = !isLoading;
  if (isLoading) {
    input.disabled = true;
  } else {
    input.disabled = false;
    input.focus();
  }
};
