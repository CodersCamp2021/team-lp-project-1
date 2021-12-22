import './module1';
import './module2';
import WeatherAPI from './weatherApi';
import AppLocalStorage from './appLocalStorage';
import DomManipulation from './DomManipulation';
import { INPUT_STATES } from './utils';
import { debounce } from './utils';
import { verifyInput } from './utils';
import { updateSearchBarDisplay } from './utils';

const weather = new WeatherAPI();
const localStorage = new AppLocalStorage();

const homeSearchBar = document.querySelector('.home-search-bar');
const dailySearchBar = document.querySelector('.daily-search-bar');

const homeSearchInput = new DomManipulation('home-input');
const dailySearchInput = new DomManipulation('daily-input');

const homeView = new DomManipulation('home-view');
const searchView = new DomManipulation('search-view');
const dataList = new DomManipulation('results');
const clearBtns = document.querySelectorAll('.fa-times');

searchView.toggleDisplay();

let inputStatus = INPUT_STATES.standby;
updateSearchBarDisplay(homeSearchBar, inputStatus);

const handleInput = async (e) => {
  const currentInput = e.target;
  const currentSearchBar = e.target.closest('form');
  const currentSearchInfo = currentSearchBar.querySelector(
    '.search-info-container p',
  );

  currentSearchInfo.innerText = '';

  if (!e.target.value) {
    inputStatus = INPUT_STATES.standby;
    updateSearchBarDisplay(currentSearchBar, inputStatus);
    return;
  }

  inputStatus = INPUT_STATES.loading;
  updateSearchBarDisplay(currentSearchBar, inputStatus);

  try {
    const res = await weather.getQueryLocations(e.target.value);

    if (res.length < 1) {
      console.log('No locations found');
      inputStatus = INPUT_STATES.error;
      updateSearchBarDisplay(currentSearchBar, inputStatus);
      currentSearchInfo.innerText = 'No results';

      return;
    }

    dataList.setDatalistChildren(res);

    if (verifyInput(res, currentInput)) {
      inputStatus = INPUT_STATES.ready;
      updateSearchBarDisplay(currentSearchBar, inputStatus);
    } else {
      inputStatus = INPUT_STATES.standby;
      updateSearchBarDisplay(currentSearchBar, inputStatus);
    }
  } catch (error) {
    inputStatus = INPUT_STATES.reload;
    updateSearchBarDisplay(currentSearchBar, inputStatus);
    currentSearchInfo.innerText = 'Try again';
  }
};

function handleSubmit(e) {
  e.preventDefault();

  if (inputStatus !== INPUT_STATES.ready) return;

  let input = this.getElementsByTagName('input')[0];
  screenSwitch(input.dataset.currentWoeid);
}

homeSearchInput.elem.addEventListener('input', debounce(handleInput, 1500));
homeSearchBar.addEventListener('submit', handleSubmit);

dailySearchInput.elem.addEventListener('input', debounce(handleInput, 800));
dailySearchBar.addEventListener('submit', handleSubmit);

const screenSwitch = async (locationID) => {
  weather.getWeatherData(locationID).then((weatherData) => {
    console.log(weatherData);
    homeView.toggleDisplay();
    searchView.toggleDisplay();
  });
};

clearBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const form = e.target.closest('form');
    const input = form.querySelector('input');
    const searchInfo = form.querySelector('.search-info-container p');

    input.value = '';
    inputStatus = INPUT_STATES.standby;
    updateSearchBarDisplay(form, inputStatus);
    searchInfo.innerText = '';
  });
});
