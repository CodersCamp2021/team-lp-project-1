import DomManipulation from './DomManipulation';

// Example usage of DomManipulation class.
const selectedElement = new DomManipulation('test');
const selectedImg = new DomManipulation('img');

setTimeout(() => selectedElement.setText('changing'), 1000);
setTimeout(
  () =>
    selectedImg.setImage(
      'https://metaweather-api.glitch.me/static/img/weather/sn.svg',
    ),
  1500,
);
setTimeout(() => {
  selectedImg.setWindIcon(36);
}, 2000);
setTimeout(() => selectedImg.setDisplayToggle(), 2500);
setTimeout(() => selectedImg.setDisplayToggle(), 3500);
