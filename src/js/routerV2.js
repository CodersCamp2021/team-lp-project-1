import DomManipulation from './DomManipulation';

const homeView = new DomManipulation('home-view');
const searchView = new DomManipulation('search-view');

const navigateTo = (action, params) => {
  const usp = new URLSearchParams({ action: action, ...params });
  history.pushState(null, null, `?${usp.toString()}`);

  render();
};

const render = () => {
  const usp = new URLSearchParams(window.location.search);
  // setWeatherInfo goes here (probably)

  if (usp.get('action') !== 'search') {
    homeView.setDisplay('flex');
    searchView.setDisplay('none');
  } else {
    homeView.setDisplay('none');
    searchView.setDisplay('flex');
  }
};

window.addEventListener('popstate', render);

document.addEventListener('DOMContentLoaded', () => {
  // for now it listens to click on search icon to change the view
  // later it should be changed for submit event in <form>
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo('search', { id: 44234, title: 'London' });
    }
  });

  render();
});
