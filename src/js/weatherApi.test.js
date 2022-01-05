import WeatherAPI, { fetchData } from './weatherApi';
import { jest } from '@jest/globals';
import {
  mockLocationData,
  mockWeatherData,
  mockHistoricalWeatherData,
} from './mockData/weatherApiDataMocks';

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(mockLocationData),
    ok: true,
  });
});

beforeEach(() => {
  fetch.mockClear();
});

// fetchData
test('fetchData returns basic location data', async () => {
  const endpoint = '/api/location/search/?query=Warsaw';
  const locationData = await fetchData(endpoint);

  expect(locationData).toEqual(mockLocationData);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://metaweather-api.glitch.me/${endpoint}`,
  );
});

test('fetchData handles exception when error is thrown', async () => {
  const endpoint = '/api/location/search/?query=Warsaw';
  fetch.mockImplementationOnce(() => Promise.reject('API Error'));

  const locationData = await fetchData(endpoint);
  expect(locationData).toEqual(undefined);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    `https://metaweather-api.glitch.me/${endpoint}`,
  );
});

// Class methods tests
describe('Class tests', () => {
  const weather = new WeatherAPI();

  // getQueryLocations
  test('getQueryLocations should return basic location data given city name', async () => {
    let city = 'Warsaw';

    const locationData = await weather.getQueryLocations(city);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(locationData).toEqual(mockLocationData);
    expect(fetch).toHaveBeenCalledWith(
      `https://metaweather-api.glitch.me//api/location/search/?query=${city}`,
    );
  });

  // getWeatherData
  test('getWeatherData should return weather data given correct id', async () => {
    let id = 523920;

    fetch.mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockWeatherData),
        ok: true,
      });
    });

    const weatherData = await weather.getWeatherData(id);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(weatherData).toEqual(mockWeatherData);
    expect(fetch).toHaveBeenCalledWith(
      `https://metaweather-api.glitch.me//api/location/${id}`,
    );
  });

  // getHistoricalWeatherData
  test('getHistoricalWeatherData should return weather data for given date, id', async () => {
    let id = 523920;
    let pastDate = '2020/12/24';

    fetch.mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockHistoricalWeatherData),
        ok: true,
      });
    });

    const historicalData = await weather.getHistoricalWeatherData(id, pastDate);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(historicalData).toEqual(mockHistoricalWeatherData);
    expect(historicalData.length).toBe(3);
    expect(
      historicalData.find(
        (day) => day.applicable_date === pastDate.replace(/\//g, '-'),
      ),
    ).toBeTruthy();
    expect(fetch).toHaveBeenCalledWith(
      `https://metaweather-api.glitch.me//api/location/${id}/${pastDate}`,
    );
  });
});
