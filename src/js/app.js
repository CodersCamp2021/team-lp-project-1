import WeatherAPI from './weatherApi';
import AppLocalStorage from './appLocalStorage';
import DomManipulation from './DomManipulation';

const weather = new WeatherAPI();
const localStorage = new AppLocalStorage();

const searchInput = new DomManipulation('home-input');
const homeView = new DomManipulation('home-view');
const searchView = new DomManipulation('search-view');
const dataList = new DomManipulation('results');

searchView.toggleDisplay();
// debounce function
// Originally inspired by  David Walsh (https://davidwalsh.name/javascript-debounce-function)

<<<<<<< HEAD
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

// Provisional screen switcher - subject to change, made to allow
// working on other features.
searchInput.elem.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    console.log(dataList.elem.children[0].dataset.woeid);
    screenSwitch(dataList.elem.children[0].dataset.woeid);
  }
});
=======


// const getDataFromAPI = async (e) => {
//     const res = await weather.getQueryLocations(e.target.value);
//     const woeid = res[0].woeid
    
//     homeView.setDisplayToggle()
//     await setWeatherInfo(woeid);
//     searchView.setDisplayToggle()
// }

// searchInput.elem.addEventListener('keyup', event => {
//     if (event.keyCode === 13){
//         const data = getDataFromAPI(event)
//     }
// });


>>>>>>> d24bb7b5c29db743a4149bd5590910a6923b2723

const screenSwitch = async (locationID) => {
  weather.getWeatherData(locationID).then((weatherData) => {
    console.log(weatherData);
    homeView.toggleDisplay();
    DomManipulation.setWeatherInfo(weatherData);
    searchView.toggleDisplay();
  });
};
