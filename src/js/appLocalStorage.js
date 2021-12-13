export default class AppLocalStorage {
  /**
  *  Method that allows to add an element to the localStorage container
  *  
  * @param {String} key is a key of the value we want to add
  * @param {String} value is a value we want to add
  */
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      //
    }
  }

  /**
  *  Method that allows to get an element from the localStorage container
  *  
  * @param {String} key is a key of the value we want to get
  * @return {String} the current value associated with the given key, or null if the given key does not exist.
  */
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      //
    }
    return null;
  }

  /**
  *  Method that allows to remove an element from the localStorage container
  *  
  * @param {String} key is a key of the value we want to remove
  */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      //
    }
  }
}
