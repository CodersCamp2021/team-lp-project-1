import DomManipulation from './DomManipulation';
import WeatherAPI from './weatherApi';

const homeView = new DomManipulation('home-view');
const searchView = new DomManipulation('search-view');
const weather = new WeatherAPI();

/**
 * Pushes proper state to history with url of site we are actually on
 * @param {String} url
 */
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

/**
 * Creates and manages between the views, checks for proper link and if
 * is not correct, redirect to the home view instead
 */
const router = async () => {
  const routes = [
    {
      path: '/',
      view: () => {
        homeView.setDisplay('flex');
        searchView.setDisplay('none');
      },
    },
    {
      path: '/search',
      view: async () => {
        const cityParams = new URLSearchParams(location.search);
        const cityVal = cityParams.get('city').toString();

        homeView.setDisplay('none');
        searchView.setDisplay('flex');
        await weather
          .getQueryLocations(cityVal)
          .then((cityData) => weather.getWeatherData(cityData[0].woeid))
          .then((cityWeather) => console.log(cityWeather));
      },
    },
  ];

  // loop through routes to create potencial matches
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
      hasQuery: new URLSearchParams(location.search).get('city'),
    };
  });

  // finding potential match
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.isMatch && potentialMatch.hasQuery,
  );

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  match.route.view();
};

const getQueryParams = (cityQuery) => {
  return new URLSearchParams({ city: cityQuery }).toString();
};

const checkForQuery = async () => {
  const cityParams = new URLSearchParams(location.search);
  const cityVal = cityParams.get('city');
  if (cityVal) {
    return true;
  } else {
    return false;
  }
};

/**
 * We want to recall router function always when we go backward or forward in session history
 */
window.addEventListener('popstate', router);

/**
 * Checks if we submit input value and if so, calls the router() function
 */
document.addEventListener('DOMContentLoaded', () => {
  // for now it listens to click on search icon to change the view
  // later it should be changed for submit event in <form>
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo('/search');
      // history.replaceState(null, null, `?${getQueryParams('London')}`);
    }
  });

  router();
});
