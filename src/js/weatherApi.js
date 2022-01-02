const URL_BASE = 'https://metaweather-api.glitch.me/';

/**
 *  The fetch method that sends queries, returns data after receiving a response. On failure, an error is returned.
 *
 * @param {String} urlEndpoint is a expansion of the underlying query "URL_BASE"
 * @return {JSON} json object with info
 */
export const fetchData = async (urlEndpoint) => {
  try {
    const response = await fetch(`${URL_BASE}${urlEndpoint}`);

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default class WeatherAPI {
  /**
   *  The method queries the API through query and returns data such as: city, id, longitude and latitude
   *
   * @param {String} name means query in the form of a city name
   * @return {JSON} json object with info: city, id, longitude and latitude
   */
  async getQueryLocations(name) {
    const apiEndpoint = `/api/location/search/?query=${name}`;

    const data = await fetchData(apiEndpoint);

    return data;
  }

  /**
   *  The method queries the API through locationID and returns info about the weather in real time
   *
   * @param {Number} id means the specific locationID
   * @return {JSON} json object with info about the weather
   */
  async getWeatherData(id) {
    const apiEndpoint = `/api/location/${id}`;

    const data = await fetchData(apiEndpoint);

    return data;
  }

  /**
   *  The method queries the API through locationID and data returns info about the historical weather
   *
   * @param {Number} id means the specific locationID
   * @param {String} date in format 'YYYY/MM/DD'
   * @return {JSON} json object with info about the historical weather
   */
  async getHistoricalWeatherData(id, date) {
    const apiEndpoint = `/api/location/${id}/${date}`;

    const data = await fetchData(apiEndpoint);

    return data;
  }
}
