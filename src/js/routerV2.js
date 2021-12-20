import DomManipulation from './DomManipulation';

const homeView = new DomManipulation('home-view');
const searchView = new DomManipulation('search-view');

const navigateTo = (url) => {
  history.pushState(null, null, `?${url}`);

  render();
};

const changeURL = (id, title = '', action = 'search') => {
  const usp = new URLSearchParams({ action: action, id: id, title: title });
  // setWeatherInfo goes here (probably)
  navigateTo(usp);
};

const render = () => {
  const usp = new URLSearchParams(window.location.search);

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
      changeURL(43221, 'London');
    }
  });

  render();
});
