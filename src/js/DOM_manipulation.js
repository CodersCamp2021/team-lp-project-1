export default class DomManipulation {
  getElement(elemId) {
    let elem = document.getElementById(elemId);
    return elem;
  }

  setText(elem, text) {
    elem.Text = text;
  }

  setImage(elem, imgPath) {
    elem.src = imgPath;
  }

  setWindIcon(elem, direction) {
    elem.style.transform = `rotate(${direction}deg)`;
  }

  setDisplayNone(elem) {
    elem.style.display = 'none';
  }

  setDisplayVisible(elem, value) {
    elem.style.display = value;
  }
}
