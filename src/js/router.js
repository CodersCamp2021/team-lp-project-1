import DomManipulation from './DomManipulation';

const homeView = new DomManipulation('home-view');
const searchView = new DomManipulation('search-view');

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
      view: () => {
        homeView.setDisplay('none');
        searchView.setDisplay('flex');
      },
    },
  ];

  // loop through routes to create potencial matches
  const potencialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  // finding potencial match
  let match = potencialMatches.find((potencialMatch) => potencialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  match.route.view();
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
    }
  });

  router();
});
