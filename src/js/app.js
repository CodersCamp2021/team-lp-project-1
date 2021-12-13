import './module1';
import './module2';
import WeatherAPI from './weather-api';
import AppLocalStorage from './app-local-storage';

const weather = new WeatherAPI();
const localStorage = new AppLocalStorage();

console.log('Hello world!');
