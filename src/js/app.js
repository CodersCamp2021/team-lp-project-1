import './module1';
import './module2';
import WeatherAPI from './weatherApi';
import AppLocalStorage from './appLocalStorage';
import DomManipulation from './DomManipulation';
import debounce from './debounce';
import verifyInput from './verifyInput';

const INPUT_STATES = {
  standby: 'standby',
  error: 'error',
  ready: 'ready',
  loading: 'loading',
  reload: 'reload',
};

const weather = new WeatherAPI();
const localStorage = new AppLocalStorage();

const inputForm = document.querySelector('.home-search-bar');
const searchInput = new DomManipulation('home-input');
const homeView = new DomManipulation('home-view');
const searchView = new DomManipulation('search-view');
const dataList = new DomManipulation('results');

searchView.toggleDisplay();

let inputStatus = INPUT_STATES.standby;

const handleInput = async (e) => {
  if (e.target.value) {
    const res = await weather.getQueryLocations(e.target.value);

    if (res.length < 1) {
      console.log('No locations found');
    }

    dataList.setDatalistChildren(res);
  }
};

function handleSubmit(e) {
  e.preventDefault();

  if (inputStatus !== INPUT_STATES.ready) return;

  let input = this.getElementsByTagName('input')[0];
  let datalistOptions = input.list.children;

  // Provisional screen switcher - subject to change, made to allow
  // working on other features.

  if (verifyInput(datalistOptions, input)) {
    screenSwitch(input.dataset.currentWoeid);
  }
}

searchInput.elem.addEventListener('input', () => {
  inputStatus = INPUT_STATES.loading;
});
searchInput.elem.addEventListener('input', debounce(handleInput, 1500));
inputForm.addEventListener('submit', handleSubmit);

const screenSwitch = async (locationID) => {
  weather.getWeatherData(locationID).then((weatherData) => {
    console.log(weatherData);
    homeView.toggleDisplay();
    searchView.toggleDisplay();
  });
};