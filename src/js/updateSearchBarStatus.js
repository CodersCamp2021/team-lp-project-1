const updateSearchBarDisplay = (searchBar, status) => {
  const icons = [...searchBar.querySelector('.search-icon-container').children];
  
  icons.forEach((icon) => {
    icon.classList.remove('active');
  });

  switch (status) {
    case 'standby':
      const standbyIcon = searchBar.querySelector('.fa-search');
      standbyIcon.classList.add('active');

      break;
    case 'loading':
      const loadingIcon = searchBar.querySelector('.lds-spinner');
      loadingIcon.classList.add('active');

      break;
    case 'error':
      const errorIcon = searchBar.querySelector('.fa-exclamation');
      errorIcon.classList.add('active');

      break;
    case 'ready':
      const readyIcon = searchBar.querySelector('.fa-check');
      readyIcon.classList.add('active');

      break;
    case 'reload':
      const reloadIcon = searchBar.querySelector('.fa-redo');
      reloadIcon.classList.add('active');

      break;
    default:
      console.log('unexpected input');
  }
};

export default updateSearchBarDisplay;
