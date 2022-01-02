import WeatherAPI, { fetchData } from './weatherApi';
import { jest } from '@jest/globals';

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          title: 'Warsaw',
          woeid: 523920,
        },
      ]),
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

  expect(locationData).toEqual([
    {
      title: 'Warsaw',
      woeid: 523920,
    },
  ]);
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

describe('Class tests', () => {
  const weather = new WeatherAPI();
  const mockWeatherData = {
    consolidated_weather: [
      {
        weather_state_name: 'Light Rain',
        weather_state_abbr: 'lr',
        created: '2021-12-30T09:59:43.051954Z',
        min_temp: 6.67,
        max_temp: 10.76,
        the_temp: 8.53,
        wind_speed: 2.9858944877700893,
        wind_direction: 130.5,
      },
      {
        weather_state_name: 'Showers',
        weather_state_abbr: 's',
        created: '2021-12-30T09:59:46.341773Z',
        min_temp: 8.52,
        max_temp: 11.325,
        the_temp: 9.975,
        wind_speed: 3.5418569589040008,
        wind_direction: 210.0195550817479,
      },
      {
        weather_state_name: 'Heavy Rain',
        weather_state_abbr: 'hr',
        created: '2021-12-30T09:59:48.971931Z',
        min_temp: 9.97,
        max_temp: 13.76,
        the_temp: 11.469999999999999,
        wind_speed: 4.111430234165805,
        wind_direction: 199.41703848362224,
      },
      {
        weather_state_name: 'Light Rain',
        weather_state_abbr: 'lr',
        created: '2021-12-30T09:59:51.970351Z',
        min_temp: 4.745,
        max_temp: 13.585,
        the_temp: 11.21,
        wind_speed: 7.90067044701344,
        wind_direction: 334.34447568364936,
      },
      {
        weather_state_name: 'Heavy Rain',
        weather_state_abbr: 'hr',
        created: '2021-12-30T09:59:54.970378Z',
        min_temp: -4.41,
        max_temp: 3.7350000000000003,
        the_temp: -0.7649999999999999,
        wind_speed: 10.751176928961533,
        wind_direction: 325.66530151323127,
      },
      {
        weather_state_name: 'Clear',
        weather_state_abbr: 'c',
        created: '2021-12-30T09:59:58.081410Z',
        min_temp: -3.5999999999999996,
        max_temp: 2.69,
        the_temp: 0.67,
        wind_speed: 5.094786844826215,
        wind_direction: 254.5,
      },
    ],
    time: '2021-12-30T06:33:06.199300-05:00',
    title: 'New York',
  };
  const mockHistoricalWeatherData = [
    {
      id: 6747805688266752,
      weather_state_name: 'Light Rain',
      weather_state_abbr: 'lr',
      wind_direction_compass: 'SW',
      created: '2020-12-24T22:25:58.372754Z',
      applicable_date: '2020-12-24',
      min_temp: 2.24,
      max_temp: 9.195,
      the_temp: 9.094999999999999,
      wind_speed: 8.22383100132559,
      wind_direction: 232.1535827887323,
      air_pressure: 1003.0,
      humidity: 89,
      visibility: 7.411404895410801,
      predictability: 75,
    },
    {
      id: 5884000875839488,
      weather_state_name: 'Light Rain',
      weather_state_abbr: 'lr',
      wind_direction_compass: 'SW',
      created: '2020-12-24T19:25:58.400768Z',
      applicable_date: '2020-12-24',
      min_temp: 2.24,
      max_temp: 9.08,
      the_temp: 9.094999999999999,
      wind_speed: 8.22383100132559,
      wind_direction: 232.1535827887323,
      air_pressure: 1003.0,
      humidity: 89,
      visibility: 7.411404895410801,
      predictability: 75,
    },
    {
      id: 5281935447293952,
      weather_state_name: 'Light Rain',
      weather_state_abbr: 'lr',
      wind_direction_compass: 'SW',
      created: '2020-12-24T16:25:58.476111Z',
      applicable_date: '2020-12-24',
      min_temp: 2.24,
      max_temp: 9.165,
      the_temp: 9.094999999999999,
      wind_speed: 8.203831001325593,
      wind_direction: 232.4843347357284,
      air_pressure: 1003.0,
      humidity: 89,
      visibility: 7.411404895410801,
      predictability: 75,
    },
  ];

  // getQueryLocations
  test('getQueryLocations should return basic location data given city name', async () => {
    let city = 'Warsaw';

    const locationData = await weather.getQueryLocations(city);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(locationData).toEqual([
      {
        title: city,
        woeid: 523920,
      },
    ]);
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
    let date = '2020/12/24';

    fetch.mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockHistoricalWeatherData),
        ok: true,
      });
    });

    const historicalData = await weather.getHistoricalWeatherData(id, date);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(historicalData).toEqual(mockHistoricalWeatherData);
    expect(fetch).toHaveBeenCalledWith(
      `https://metaweather-api.glitch.me//api/location/${id}/${date}`,
    );
  });
});
