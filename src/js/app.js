import './module1';
import './module2';
import WeatherAPI from './weatherApi';
import AppLocalStorage from './appLocalStorage';
import DomManipulation from './DomManipulation';

const weather = new WeatherAPI();
const searchInput = new DomManipulation('home-input');
const homeView = new DomManipulation('home-view');
const searchView = new DomManipulation('search-view');

const setWeatherInfo = async(data) => {
    const dailyCityName = new DomManipulation('daily-city-name');
    dailyCityName.setText(data.title);
    const dailyCurrentTime = new DomManipulation('daily-current-time');
    dailyCurrentTime.setText(data.time.substr(11,5));
    const abbr = new DomManipulation('daily-abbr');
    abbr.setImage(`https://www.metaweather.com/static/img/weather/${data.consolidated_weather[0].weather_state_abbr}.svg`);
    const dailyTemp = new DomManipulation('daily-temp');
    dailyTemp.setText(`${parseInt(data.consolidated_weather[0].the_temp, 10)}°C`);
    const dailyState = new DomManipulation('daily-state');
    dailyState.setText(data.consolidated_weather[0].weather_state_name);
    const dailyMin = new DomManipulation('daily-min');
    dailyMin.setText(`min: ${parseInt(data.consolidated_weather[0].min_temp, 10)}°C`);
    const dailyMax = new DomManipulation('daily-max');
    dailyMax.setText(`max: ${parseInt(data.consolidated_weather[0].max_temp, 10)}°C`);
    const dailyArrow = new DomManipulation('daily-arrow');
    dailyArrow.setWindIcon(data.consolidated_weather[0].wind_direction);
    const dailyWindSpeed = new DomManipulation('daily-wind-speed');
    dailyWindSpeed.setText(`${parseInt(data.consolidated_weather[0].wind_speed, 10)}\n mph`);
    const lastUpdate = new DomManipulation('daily-update');
    setUpdatedTime(lastUpdate, data.consolidated_weather[0].created)
    for (let day = 1; day < 6; day++){
        const abbr = new DomManipulation(`card${day}-abbr`);
        const dailyTemp = new DomManipulation(`card${day}-temp`);
        const dailyState = new DomManipulation(`card${day}-state`);
        const dailyWindSpeed = new DomManipulation(`card${day}-wind`);
        const dailyArrow = new DomManipulation(`card${day}-arrow`);
        abbr.setImage(`https://www.metaweather.com/static/img/weather/${data.consolidated_weather[day].weather_state_abbr}.svg`);
        dailyTemp.setText(`${parseInt(data.consolidated_weather[day].the_temp, 10)}°C`);
        dailyState.setText(data.consolidated_weather[day].weather_state_name);
        dailyWindSpeed.setText(`${parseInt(data.consolidated_weather[day].wind_speed, 10)}\n mph`);
        dailyArrow.setWindIcon(data.consolidated_weather[day].wind_direction);
    };
}

const getDataFromAPI = async (e) => {
    const res = await weather.getQueryLocations(e.target.value);
    const woeid = res[0].woeid
    const data = await weather.getWeatherData(woeid)
    homeView.setDisplayToggle()
    await setWeatherInfo(data);
    searchView.setDisplayToggle()
}

searchInput.elem.addEventListener('keyup', event => {
    if (event.keyCode === 13){
        const data = getDataFromAPI(event)
    }
});

function setUpdatedTime(dailyUpdateObject, createdTime) {
    const timeNow = Date.now();
    const infoCreatedTime = Date.parse(createdTime);
    const duration = timeNow - infoCreatedTime;
    let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    dailyUpdateObject.setText(`Updated ${hours} hours ${minutes} minutes ago`);
  };

