const verifyInput = (cityList, input) => {
  const cityMatch = cityList.find(
    ({ title }) => title.toLowerCase() === input.value.toLowerCase(),
  );

  if (cityMatch) {
    input.dataset.currentWoeid = cityMatch.woeid; // setting 'dataset.currentWoeid' at input
    input.dataset.currentCity = cityMatch.title; // setting 'dataset.currentCity' at input
    return true;
  } else {
    return false;
  }
};

export default verifyInput;
