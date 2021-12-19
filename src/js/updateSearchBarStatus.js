import DomManipulation from './DomManipulation';

const standbyIcon = new DomManipulation('standbyIcon');
const errorIcon = new DomManipulation('errorIcon');
const readyIcon = new DomManipulation('readyIcon');
const reloadIcon = new DomManipulation('reloadIcon');
const loadingSpinner = new DomManipulation('loadingSpinner');

const updateSearchBarDisplay = (status) => {
  switch (status) {
    case 'standby':
      errorIcon.makeNotActive();
      readyIcon.makeNotActive();
      reloadIcon.makeNotActive();
      loadingSpinner.makeNotActive();
      standbyIcon.makeActive();
      break;
    case 'loading':
      errorIcon.makeNotActive();
      readyIcon.makeNotActive();
      reloadIcon.makeNotActive();
      standbyIcon.makeNotActive();
      loadingSpinner.makeActive();
      break;
    case 'error':
      readyIcon.makeNotActive();
      reloadIcon.makeNotActive();
      standbyIcon.makeNotActive();
      loadingSpinner.makeNotActive();
      errorIcon.makeActive();
      break;
    case 'ready':
      errorIcon.makeNotActive();
      reloadIcon.makeNotActive();
      standbyIcon.makeNotActive();
      loadingSpinner.makeNotActive();
      readyIcon.makeActive();
      break;
    case 'reload':
      errorIcon.makeNotActive();
      standbyIcon.makeNotActive();
      loadingSpinner.makeNotActive();
      readyIcon.makeNotActive();
      reloadIcon.makeActive();
      break;
    default:
      console.log('unexpected input');
  }
};

export default updateSearchBarDisplay;
