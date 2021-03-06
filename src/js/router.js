import DomManipulation from './DomManipulation';
import WeatherAPI from './weatherApi';
import AppLocalStorage from './appLocalStorage';
import SessionStorage from './sessionStorage';

/**
 * navigateTo creates proper query string based on the passed data,
 * uses historyAPI to set appropriate URL for the user and calls render()
 * @param {string} action
 * @param {object} params
 */
const navigateTo = (action, params) => {
  if (action !== 'search') {
    history.replaceState(null, null, '/');
  } else {
    const usp = new URLSearchParams({ action: action, ...params });
    if (params.id !== history.state?.woeid) {
      history.pushState({ woeid: params.id }, null, `?${usp.toString()}`);
    }
  }
  render();
};

/**
 * render based on the value of 'action' query switches to appropriate
 * view:
 * - searchView for any 'action' equal to anything other than 'search'
 * - homeView for all the other cases
 */
const render = async () => {
  const weather = new WeatherAPI();
  const homeView = new DomManipulation('home-view');
  const searchView = new DomManipulation('search-view');
  const lastWeather = new DomManipulation('last-weather-info');
  const pageLoadingSpinner = new DomManipulation('page-loadingSpinner');

  const usp = new URLSearchParams(window.location.search);
  const id = usp.get('id');

  if (usp.get('action') !== 'search') {
    //display last location weather info (if it exists)
    if (AppLocalStorage.get('lastWeather')) {
      DomManipulation.setLastWeather(AppLocalStorage.get('lastWeather'));
      lastWeather.setDisplay('flex');
    } else {
      lastWeather.setDisplay('none');
    }

    homeView.setDisplay('flex');
    searchView.setDisplay('none');
  } else {
    pageLoadingSpinner.setDisplay('flex');

    let weatherData;
    let warsawData;

    if (SessionStorage.get(id)) {
      weatherData = SessionStorage.get(id);
    } else {
      weatherData = await weather.getWeatherData(id);
      SessionStorage.set(id, weatherData);
    }

    AppLocalStorage.set('lastWeather', weatherData);

    if (SessionStorage.get(523920)) {
      warsawData = SessionStorage.get(523920);
    } else {
      warsawData = await weather.getWeatherData(523920);
      SessionStorage.set(523920, warsawData);
    }


    setTimeout(() => {
      DomManipulation.setWeatherInfo(weatherData);
      DomManipulation.setWarsawWeather(warsawData);
      pageLoadingSpinner.setDisplay('none');
      homeView.setDisplay('none');
      searchView.setDisplay('flex');
    }, 500);
  }
};

export { navigateTo, render };
