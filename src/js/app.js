import './module1';
import './module2';
import DomManipulation from './DOM_manipulation';

console.log('Hello world!');
dom_obj = new DomManipulation();

const selectedElement = dom_obj.getElement('test');
const selectedImg = dom_obj.getElement('img');

setTimeout(() => dom_obj.setText(selectedElement, 'changing'), 1000);
setTimeout(
  () =>
    dom_obj.setImage(
      selectedImg,
      'https://thumbs.dreamstime.com/z/small-cat-8301434.jpg',
    ),
  1500,
);
setTimeout(() => {
  dom_obj.setWindIcon(selectedImg, 36);
}, 2000);
setTimeout(() => dom_obj.setDisplayNone(selectedImg), 2500);
setTimeout(() => dom_obj.setDisplayVisible(selectedImg, 'block'), 3000);
