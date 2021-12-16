import './module1';
import './module2';
import WeatherAPI from './weatherApi';
import AppLocalStorage from './appLocalStorage';
import DomManipulation from './DomManipulation';

const weather = new WeatherAPI();
const searchInput = new DomManipulation('home-input');
const homeView = new DomManipulation('home-view');
const searchView = new DomManipulation('search-view');
const dataList = new DomManipulation('results');



const getDataFromAPI = async (e) => {
    const res = await weather.getQueryLocations(e.target.value);
    const woeid = res[0].woeid
    const data = await weather.getWeatherData(woeid)
    console.log(data)

    homeView.setDisplayToggle()
    const dailyCityName = new DomManipulation('daily-city-name')
    dailyCityName.setText(data.title)
    const dailyCurrentTime = new DomManipulation('daily-current-time')
    dailyCurrentTime.setText(data.time)
    const abbr = new DomManipulation('daily-abbr')
    abbr.setImage(`https://www.metaweather.com/static/img/weather/${data.consolidated_weather[0].weather_state_abbr}.svg`)
    const dailyTemp = new DomManipulation('daily-temp')
    dailyTemp.setText(data.consolidated_weather[0].the_temp)
    const dailyState = new DomManipulation('daily-state')
    dailyState.setText(data.consolidated_weather[0].weather_state_name)
    const dailyMin = new DomManipulation('daily-min')
    dailyMin.setText(data.consolidated_weather[0].min_temp)
    const dailyMax = new DomManipulation('daily-max')
    dailyMax.setText(data.consolidated_weather[0].max_temp)
    const dailyArrow = new DomManipulation('daily-arrow')
    dailyArrow.setWindIcon(data.consolidated_weather[0].wind_direction)
    const dailyWindSpeed = new DomManipulation('daily-wind-speed')
    dailyWindSpeed.setText(data.consolidated_weather[0].wind_speed)
    searchView.setDisplayToggle()
}


searchInput.elem.addEventListener('keyup', event => {
    if (event.keyCode === 13){
        const data = getDataFromAPI(event)
    }
});
