/**
 * @jest-environment jsdom
 */
import DomManipulation from './DomManipulation';
import { jest } from '@jest/globals';

const divID = 'mockDiv';
const imgID = 'mockImg';

/**
 * DOM Element setup and teardown
 */
beforeEach(() => {
  const mockDiv = document.createElement('div');
  mockDiv.setAttribute('id', divID);
  const mockImg = document.createElement('img');
  mockImg.setAttribute('id', imgID);
  document.body.append(mockDiv, mockImg);
});

afterEach(() => {
  document.getElementById(divID).remove();
  document.getElementById(imgID).remove();
});

// DomManipulation constructor
test('domObj should select element with correct ID', () => {
  const domManObj = new DomManipulation(divID);
  expect(domManObj.elem.id).toBe(divID);
});

/**
 * Methods tests
 */

// setText
test('setText should change innerText of the element', () => {
  const domManObj = new DomManipulation(divID);
  const desiredInnerText = 'Wroclaw';
  domManObj.setText(desiredInnerText);
  expect(domManObj.elem.innerText).toBe(desiredInnerText);
  domManObj.setText(45);
  expect(domManObj.elem.innerText).toBe(45);
  domManObj.setText('<div>innerHTML maybe?</div>');
  expect(domManObj.elem.innerText).not.toBe('innerHTML maybe?');
});

// setImage
test('setImage should change src of the element', () => {
  const domManObj = new DomManipulation(imgID);
  const imgPath = 'https://www.metaweather.com/static/img/weather/s.svg';
  expect(domManObj).not.toHaveProperty('elem.src', imgPath);
  domManObj.setImage(imgPath);
  expect(domManObj).toHaveProperty('elem.src', imgPath);
});

// setWindIcon
test('setWindIcon should set transform: rotate property', () => {
  const domManObj = new DomManipulation(imgID);
  const degNum = 77;
  domManObj.setWindIcon(degNum);
  expect(domManObj).toHaveProperty(
    'elem.style.transform',
    `rotate(${degNum + 90}deg)`,
  );
});

// setDatalistChildren
test(`setDatalistChildren should clear all children elements of the parent el, create correct 
      amount of "option" elements with title, woeid and append them to given parent element`, () => {
  const domManObj = new DomManipulation(divID);
  const mockItemList = [
    { title: 'London', woeid: 10 },
    { title: 'tes Val', woeid: 20 },
    { title: 'ąęćńóźćż', woeid: 30 },
    { title: 'San Diego', woeid: 40 },
  ];

  domManObj.setDatalistChildren(mockItemList);
  expect(domManObj.elem.children).toHaveLength(mockItemList.length);

  for (let i = 0; i < domManObj.elem.children.length; i++) {
    expect(domManObj.elem.children[i].tagName).toBe('option'.toUpperCase());
    expect(domManObj.elem.children[i]).toHaveProperty(
      'value',
      mockItemList[i].title,
    );
    expect(domManObj.elem.children[i]).toHaveProperty(
      'dataset.woeid',
      String(mockItemList[i].woeid),
    );
  }

  domManObj.setDatalistChildren([]);
  expect(domManObj.elem.children).toHaveLength(0);
});

// toggleDisplay
test('toggleDisplay should toggle display prop betwen flex and none', () => {
  const domManObj = new DomManipulation(divID);
  domManObj.toggleDisplay();
  expect(domManObj.elem).toHaveProperty('style.display', 'none');
  domManObj.toggleDisplay();
  expect(domManObj.elem).toHaveProperty('style.display', 'flex');
});

// reset
test('should should set element value to empty string', () => {
  const domManObj = new DomManipulation(divID);
  domManObj.reset();
  expect(domManObj.elem.value).toBe('');
  domManObj.elem.value = 'some value to be removed';
  expect(domManObj.elem.value).toEqual(expect.any(String));
  domManObj.reset();
  expect(domManObj.elem.value).toBe('');
});

// setDay
test("setDay should get today's date and return weekdays name based on provided offset", () => {
  const domManObj = new DomManipulation(divID);
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  for (let i = 0; i < 6; i++) {
    expect(domManObj.setDay(i)).toEqual(expect.any(String));
    expect(domManObj.setDay(i)).toBe(weekdays[(new Date().getDay() + i) % 7]);
  }
});

// setMonth
test("setMonth should return current month's name", () => {
  const domManObj = new DomManipulation(divID);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  expect(domManObj.setMonth()).toEqual(expect.any(String));
  expect(domManObj.setMonth()).toBe(months[new Date().getMonth()]);
});

// setUpdatedTime
test('setUpdatedTime should set text after calculating how much time has passed since given time', () => {
  Date.now = jest.fn(() => Date.parse('2021-12-31T09:59:43.051954Z'));
  let dateVal = '2021-12-30T16:25:43.051954Z';

  const domManObj = new DomManipulation(divID);
  DomManipulation.setUpdatedTime(domManObj, dateVal);
  expect(typeof domManObj.elem.innerText).toBe('string');
  expect(domManObj.elem.innerText).toBe(`Updated 17 hours 34 minutes ago`);
});

// setWeatherInfo
test.skip('setWeatherInfo should put correct data to html from JSON', () => {
  const mockData = {
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

  jest.mock('./DomManipulation');
  const mockedDomMan = jest.mocked(DomManipulation, true);
  mockedDomMan.setWeatherInfo(mockData);

  const domManDiv = new DomManipulation(divID);
  const domManImg = new DomManipulation(imgID);

  const setImageSpy = jest.spyOn(domManDiv, 'setImage');
  const setWindIconSpy = jest.spyOn(domManImg, 'setWindIcon');
  const setUpdatedTimeSpy = jest.spyOn(DomManipulation, 'setUpdatedTime');
  const setDaySpy = jest.spyOn(domManDiv, 'setDay');
  const setWeatherInfoSpy = jest.spyOn(DomManipulation, 'setWeatherInfo');

  const dailyCityName = new DomManipulation('daily-city-name');
  const setTextSpy = jest.spyOn(dailyCityName, 'setText');

  DomManipulation.setWeatherInfo(mockData);
  expect(setTextSpy).toHaveBeenCalled();
});

// setDisplay
test('setDisplay should set style.display to desired value', () => {
  const domManObj = new DomManipulation(divID);
  const displayList = ['none', 'block', 'flex', 'grid', 'inline'];
  displayList.forEach((dispVal) => {
    domManObj.setDisplay(dispVal);
    expect(domManObj.elem.style.display).toBe(dispVal);
  });
});
