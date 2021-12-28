export default class SessionStorage {
  /**
   * The function sets the data in SessionStorage
   * depends on the key and value pair
   * @param {String} key
   * @param {String} value
   */
  static set(key, value) {
    window.sessionStorage.setItem(key, value);
  }

  /**
   * If the key is defined in Session Storage, function
   * returns the value, otherwise it returns null
   * @param {String} key
   * @returns {String}
   */
  static get(key) {
    return window.sessionStorage.getItem(key);
  }
}
