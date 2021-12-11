const URL_BASE = 'https://metaweather-api.glitch.me/';

const fetchData = async (urlEndpoint) => {
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
  async getLocationId(name) {
    const apiEndpoint = `/api/location/search/?query=${name}`;

    const data = await fetchData(apiEndpoint);

    return data;
  }

  async getWeatherData(id) {
    const apiEndpoint = `/api/location/${id}`;

    const data = await fetchData(apiEndpoint);

    //is this class the right place to handle local storage???
    localStorage.setItem('weather', JSON.stringify(data));

    return data;
  }

  async getHistoricalWeatherData(id, date) {
    const apiEndpoint = `/api/location/${id}/${date}`;

    const data = await fetchData(apiEndpoint);

    console.log(data);

    return data;
  }
}
