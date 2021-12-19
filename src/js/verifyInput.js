const verifyInput = (options, input) => {
  const cityList = Array.from(options).map((option) => ({
    // Creating an array of { cityName, ID } objects
    title: option.value,
    woeid: option.dataset.woeid,
  }));

  const cityMatch = cityList.find(
    ({ title }) => title.toLowerCase() === input.value.toLowerCase(),
  );

  if (cityMatch) {
    input.dataset.currentWoeid = cityMatch.woeid; // setting current woeid of input to be that of matched city
    return true;
  } else {
    return false;
  }
};

export default verifyInput;
