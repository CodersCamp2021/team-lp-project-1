import DomManipulation from './DomManipulation';
import WeatherAPI from './weatherApi';

const weather = new WeatherAPI();
const homeView = new DomManipulation('home-view');
const searchView = new DomManipulation('search-view');
const pageLoadingSpinner = new DomManipulation('page-loadingSpinner');

/**
 * navigateTo creates proper query string based on the passed data,
 * uses historyAPI to set appropriate URL for the user and calls render()
 * @param {string} action
 * @param {object} params
 */
const navigateTo = (action, params) => {
  const usp = new URLSearchParams({ action: action, ...params });
  history.pushState(null, null, `?${usp.toString()}`);

  render();
};

/**
 * render based on the value of 'action' query switches to appropriate
 * view:
 * - searchView for any 'action' equal to anything other than 'search'
 * - homeView for all the other cases
 */
const render = async () => {
  const usp = new URLSearchParams(window.location.search);

  if (usp.get('action') !== 'search') {
    homeView.setDisplay('flex');
    searchView.setDisplay('none');
  } else {
    pageLoadingSpinner.setDisplay('flex');
    const weatherData = await weather.getWeatherData(usp.get('id'));
    const warsawData = await weather.getWeatherData(523920);
    pageLoadingSpinner.setDisplay('none');
    DomManipulation.setWeatherInfo(weatherData);
    DomManipulation.setWarsawWeather(warsawData);
    homeView.setDisplay('none');
    searchView.setDisplay('flex');
  }
};

export { navigateTo, render };
