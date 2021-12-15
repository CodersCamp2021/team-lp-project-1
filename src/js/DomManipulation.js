export default class DomManipulation {
  /**
   * Sets 'this.elem' to an element with corresponding ID
   * of the instantiated object.
   * @param {string} elemID
   */
  constructor(elemID) {
    this.elem = document.getElementById(elemID);
  }

  setText(text) {
    this.elem.innerText = text;
  }

  setImage(imgPath) {
    this.elem.src = imgPath;
  }

  /**
   * Transforms the wind direction icon to
   * reflect the wind direction data.
   * @param {Number} direction
   */
  setWindIcon(direction) {
    this.elem.style.transform = `rotate(${direction}deg)`;
  }

  /**
   * Creates and sets options for selected element (eg. 'datalist')
   * based on the items array 'title' property.
   * @param {Array} itemList
   */
  setDatalistChildren(itemList) {
    this.elem.innerHTML = '';

    itemList.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.title;
      this.elem.append(option);
    });
  }

  /**
   * Method responsible for hiding/showing elements,
   * will be used to swap layouts.
   */
  setDisplayToggle() {
    this.elem.style.display =
      this.elem.style.display === 'none' ? 'block' : 'none';
  }
}
