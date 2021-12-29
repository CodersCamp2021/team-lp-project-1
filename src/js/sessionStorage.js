export default class SessionStorage {
  /**
   * The function sets the data in SessionStorage
   * depends on the key and value pair
   * @param {*} key
   * @param {*} value
   */
  static set(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * If the key is defined in Session Storage, function
   * returns the value, otherwise it returns null
   * @param {String} key
   * @returns {String}
   */
  static get(key) {
    try {
      return JSON.parse(window.sessionStorage.getItem(key));
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
