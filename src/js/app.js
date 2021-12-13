import './module1';
import './module2';
import WeatherAPI from './weather-api';
import AppLocalStorage from './app-local-storage';
import DomManipulation from './DomManipulation';

const weather = new WeatherAPI();
const localStorage = new AppLocalStorage();
const selectedElement = new DomManipulation('test');
