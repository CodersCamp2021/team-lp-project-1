import './module1';
import './module2';
import WeatherAPI from './weatherApi';
import AppLocalStorage from './appLocalStorage';

const weather = new WeatherAPI();
const localStorage = new AppLocalStorage();

console.log('Hello world!');
