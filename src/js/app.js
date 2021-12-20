import WeatherAPI from './weatherApi';
import AppLocalStorage from './appLocalStorage';
import DomManipulation from './DomManipulation';

const weather = new WeatherAPI();
const searchInput = new DomManipulation('home-input');
const homeView = new DomManipulation('home-view');
const searchView = new DomManipulation('search-view');



// const getDataFromAPI = async (e) => {
//     const res = await weather.getQueryLocations(e.target.value);
//     const woeid = res[0].woeid
    
//     homeView.setDisplayToggle()
//     await setWeatherInfo(woeid);
//     searchView.setDisplayToggle()
// }

// searchInput.elem.addEventListener('keyup', event => {
//     if (event.keyCode === 13){
//         const data = getDataFromAPI(event)
//     }
// });



