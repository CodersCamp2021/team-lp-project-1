export default class DomManipulation {
  constructor(elemID) {
    this.elem = document.getElementById(elemID);
  }

  setText(text) {
    this.elem.innerText = text;
  }

  setImage(imgPath) {
    this.elem.src = imgPath;
  }

  setWindIcon(direction) {
    this.elem.style.transform = `rotate(${direction}deg)`;
  }

  setDisplayToggle() {
    this.elem.style.display =
      this.elem.style.display === 'none' ? 'block' : 'none';
  }
}
