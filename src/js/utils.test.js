import { verifyInput } from './utils.js';

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
  it(`verifyInput: "${inputObj.value}" should pass verification`, () => {
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
  it(`verifyInput: "${inputObj}" should not pass verification`, () => {
    expect(verifyInput(mockList, inputObj)).toBe(false);
  });
});
