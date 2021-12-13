export default class AppLocalStorage {
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      //
    }
  }

  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      //
    }
    return null;
  }

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      //
    }
  }
}
