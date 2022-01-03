/**
 * @jest-environment jsdom
 */
import { render, navigateTo } from './router';
import DomManipulation from './DomManipulation';
import WeatherAPI from './weatherApi';
import AppLocalStorage from './appLocalStorage';
import SessionStorage from './sessionStorage';
import { mockWeatherData } from './mockData/weatherApiDataMocks';

jest.mock('./weatherApi');
jest.mock('./appLocalStorage');
jest.mock('./sessionStorage');

beforeEach(() => {
  WeatherAPI.mockClear();
  AppLocalStorage.mockClear();
  SessionStorage.mockClear();
  const mockHomeView = document.createElement('div');
  mockHomeView.setAttribute('id', 'home-view');
  const mockSearchView = document.createElement('div');
  mockSearchView.setAttribute('id', 'search-view');
  const mockLastWeather = document.createElement('div');
  mockLastWeather.setAttribute('id', 'last-weather-info');
  const mockPageSpinner = document.createElement('div');
  mockPageSpinner.setAttribute('id', 'page-loadingSpinner');
  document.body.append(
    mockHomeView,
    mockSearchView,
    mockLastWeather,
    mockPageSpinner,
  );
  jest
    .spyOn(DomManipulation, 'setWeatherInfo')
    .mockImplementation(() => mockWeatherData);
  jest
    .spyOn(DomManipulation, 'setWarsawWeather')
    .mockImplementation(() => mockWeatherData);
});

afterEach(() => {
  document.getElementById('home-view').remove();
  document.getElementById('search-view').remove();
  document.getElementById('last-weather-info').remove();
  document.getElementById('page-loadingSpinner').remove();
});

// render
test('render should switch view to SearchView', async () => {
  delete window.location;
  window.location = new URL(
    'http://www.jesttest.pl/?action=search&id=523920&title=Warsaw',
  );

  await render();

  const mockHomeView = document.getElementById('home-view');
  const mockSearchView = document.getElementById('search-view');
  const mockLastWeather = document.getElementById('last-weather-info');
  const mockPageSpinner = document.getElementById('page-loadingSpinner');
  expect(mockHomeView).toHaveProperty('style.display', 'none');
  expect(mockSearchView).toHaveProperty('style.display', 'flex');
  expect(mockLastWeather).toHaveProperty('style.display', '');
  expect(mockPageSpinner).toHaveProperty('style.display', 'none');
});

test('render should switch view to HomeView', async () => {
  delete window.location;
  window.location = new URL('http://www.jesttest.pl/?action=undefined');

  await render();

  const mockHomeView = document.getElementById('home-view');
  const mockSearchView = document.getElementById('search-view');
  const mockLastWeather = document.getElementById('last-weather-info');
  const mockPageSpinner = document.getElementById('page-loadingSpinner');
  expect(mockHomeView).toHaveProperty('style.display', 'flex');
  expect(mockSearchView).toHaveProperty('style.display', 'none');
  expect(mockLastWeather).toHaveProperty('style.display', 'none');
  expect(mockPageSpinner).toHaveProperty('style.display', '');
});
