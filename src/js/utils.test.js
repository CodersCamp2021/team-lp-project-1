/**
 * @jest-environment jsdom
 */
import { updateSearchFormDisplay, verifyInput, INPUT_STATES } from './utils.js';

// verifyInput
const mockList = [
  { title: 'London', woeid: 11 },
  { title: 'Warsaw', woeid: 22 },
  { title: 'Wrocław', woeid: 33 },
  { title: 'San Diego', woeid: 44 },
  { title: 'Austin', woeid: 55 },
  { title: 'New York', woeid: 66 },
];
const validInput = ['Austin', 'london', 'WROCŁAW', 'nEw yOrK'].map((entry) => {
  const inputObj = {
    value: entry,
    dataset: {
      currentWoeid: 0,
      currentCity: '',
    },
  };
  return inputObj;
});
const invalidInput = [
  '10',
  'Santa Cruz',
  'New York:',
  'SanDiego',
  'san-diego',
  'San  Diego',
  'AUSTINN',
  ' new york',
  'wroclaw',
  '',
].map((entry) => {
  const inputObj = {
    value: entry,
    dataset: {
      currentWoeid: undefined,
      currentCity: undefined,
    },
  };
  return inputObj;
});

validInput.forEach((inputObj) => {
  test(`verifyInput: "${inputObj.value}" should pass verification`, () => {
    expect(verifyInput(mockList, inputObj)).toBe(true);

    const desiredInputObjSchema = {
      dataset: {
        currentWoeid: expect.any(Number),
        currentCity: expect.any(String),
      },
    };

    expect(inputObj).toMatchObject(desiredInputObjSchema);
  });
});

invalidInput.forEach((inputObj) => {
  test(`verifyInput: "${inputObj}" should not pass verification`, () => {
    expect(verifyInput(mockList, inputObj)).toBe(false);
  });
});

// updateSearchFormDisplay
test('updateSearchFormDisplay should set correct statuses for icons', () => {
  const mockSearchBar = document.createElement('div');
  const iconContainer = document.createElement('div');
  iconContainer.classList.add('search-icon-container');
  mockSearchBar.append(iconContainer);
  document.body.append(mockSearchBar);

  const searchIcon = document.createElement('img');
  const spinnerIcon = document.createElement('img');
  const exclamationIcon = document.createElement('img');
  const checkIcon = document.createElement('img');
  const redoIcon = document.createElement('img');

  searchIcon.classList.add('fa-search');
  spinnerIcon.classList.add('lds-spinner');
  exclamationIcon.classList.add('fa-exclamation');
  checkIcon.classList.add('fa-check');
  redoIcon.classList.add('fa-redo');

  iconContainer.append(
    searchIcon,
    spinnerIcon,
    exclamationIcon,
    checkIcon,
    redoIcon,
  );
  Array.from(iconContainer.children).forEach((icon) =>
    icon.classList.add('active'),
  );
  Array.from(iconContainer.children).forEach((icon) =>
    expect(icon.classList.contains('active')).toBe(true),
  );
  updateSearchFormDisplay(mockSearchBar, 'wrong status');
  Array.from(iconContainer.children).forEach((icon) =>
    expect(icon.classList.contains('active')).toBe(false),
  );

  Object.values(INPUT_STATES).forEach((status) => {
    updateSearchFormDisplay(mockSearchBar, status);
    expect(mockSearchBar.querySelectorAll('.active').length).toBe(1);
  });
});
