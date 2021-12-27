export default class DomManipulation {
  /**
   * Sets 'this.elem' to an element with corresponding ID
   * of the instantiated object.
   * @param {string} elemID
   */
  constructor(elemID) {
    this.elem = document.getElementById(elemID);
  }

  setText(text) {
    this.elem.innerText = text;
  }

  setImage(imgPath) {
    this.elem.src = imgPath;
  }

  /**
   * Transforms the wind direction icon to
   * reflect the wind direction data.
   * @param {Number} direction
   */
  setWindIcon(direction) {
    direction = direction + 90
    this.elem.style.transform = `rotate(${direction}deg)`;
  }

  /**
   * Creates and sets options for selected element (eg. 'datalist')
   * based on the items array 'title' property.
   * @param {Array} itemList
   */
  setDatalistChildren(itemList) {
    this.elem.innerHTML = '';

    itemList.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.title;
      option.dataset.woeid = item.woeid;
      this.elem.append(option);
    });
  }

  /**
   * Method responsible for hiding/showing elements,
   * will be used to swap layouts.
   */
  toggleDisplay() {
    this.elem.style.display =
      this.elem.style.display === 'none' ? 'flex' : 'none';
  }
  reset() {
    this.elem.value = '';
  }

  /**
   * Method returns day name. 
   * @param {int} offset 
   * @returns One of days Name as string
   */
  setDay(offset){
    const today = new Date().getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayName = days[(today + offset) % 7]
    return dayName
  }

  /**
   * Method returns month name. 
   * @returns One of month Name as string
   */
  setMonth(){
    const today = new Date().getMonth();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
    'September', 'October', 'November', 'December'];
    let monthName = months[(today) % 12]
    return monthName
  }

  /**
   * Method puts data from JSON to HTML.
   * @param {JSON} data 
   */
  static setWeatherInfo = (data) => {
    const dailyCityName = new DomManipulation('daily-city-name');
    dailyCityName.setText(data.title);
    const dailyCurrentTime = new DomManipulation('daily-current-time');
    dailyCurrentTime.setText(data.time.substr(11, 5));
    const abbr = new DomManipulation('daily-abbr');
    abbr.setImage(
      `https://www.metaweather.com/static/img/weather/${data.consolidated_weather[0].weather_state_abbr}.svg`,
    );
    const dailyTemp = new DomManipulation('daily-temp');
    dailyTemp.setText(
      `${parseInt(data.consolidated_weather[0].the_temp, 10)}°C`,
    );
    const dailyState = new DomManipulation('daily-state');
    dailyState.setText(data.consolidated_weather[0].weather_state_name);
    const dailyMin = new DomManipulation('daily-min');
    dailyMin.setText(
      `min: ${parseInt(data.consolidated_weather[0].min_temp, 10)}°C`,
    );
    const dailyMax = new DomManipulation('daily-max');
    dailyMax.setText(
      `max: ${parseInt(data.consolidated_weather[0].max_temp, 10)}°C`,
    );
    const dailyArrow = new DomManipulation('daily-arrow');
    dailyArrow.setWindIcon(data.consolidated_weather[0].wind_direction);
    const dailyWindSpeed = new DomManipulation('daily-wind-speed');
    dailyWindSpeed.setText(
      `${parseInt(data.consolidated_weather[0].wind_speed, 10)}\n mph`,
    );
    const lastUpdate = new DomManipulation('daily-update');
    DomManipulation.setUpdatedTime(
      lastUpdate,
      data.consolidated_weather[0].created,
    );
    for (let day = 1; day < 6; day++) {
      const abbr = new DomManipulation(`card${day}-abbr`);
      const dailyTemp = new DomManipulation(`card${day}-temp`);
      const dailyState = new DomManipulation(`card${day}-state`);
      const dailyWindSpeed = new DomManipulation(`card${day}-wind`);
      const dailyArrow = new DomManipulation(`card${day}-arrow`);
      const dayName = new DomManipulation(`card${day}-day`);
      abbr.setImage(
        `https://www.metaweather.com/static/img/weather/${data.consolidated_weather[day].weather_state_abbr}.svg`,
      );
      dailyTemp.setText(
        `${parseInt(data.consolidated_weather[day].the_temp, 10)}°C`,
      );
      dailyState.setText(data.consolidated_weather[day].weather_state_name);
      dailyWindSpeed.setText(
        `${parseInt(data.consolidated_weather[day].wind_speed, 10)}\n mph`,
      );
      dailyArrow.setWindIcon(data.consolidated_weather[day].wind_direction);
      dayName.setText(dayName.setDay(day))
    }
  };

  /**
   * 
   * @param {DomManipulation} dailyUpdateObject 
   * @param {string} createdTime 
   */
  static setUpdatedTime(dailyUpdateObject, createdTime) {
    const timeNow = Date.now();
    const infoCreatedTime = Date.parse(createdTime);
    const duration = timeNow - infoCreatedTime;
    let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    dailyUpdateObject.setText(`Updated ${hours} hours ${minutes} minutes ago`);
  }

  /**
   * Method puts data from JSON to HTML for local Data Info.
   * @param {JSON} data 
   */
  static setWarsawWeather(data){
    const localCityName = new DomManipulation('local-city-country');
    localCityName.setText(data.title);
    const localCurrentTime = new DomManipulation('local-date');
    localCurrentTime.setText(`${localCurrentTime.setDay(0)} ${new Date().getDate()} ${localCurrentTime.setMonth()}`);
    const localAbbr = new DomManipulation('local-abbr');
    localAbbr.setImage(
      `https://www.metaweather.com/static/img/weather/${data.consolidated_weather[0].weather_state_abbr}.svg`);
    const localTemp = new DomManipulation('local-temp');
    localTemp.setText(`${parseInt(data.consolidated_weather[0].the_temp, 10)}°C`);
    const localTempMin = new DomManipulation('local-low');
    localTempMin.setText(`${parseInt(data.consolidated_weather[0].min_temp, 10)}°C`);
    const localTempMax = new DomManipulation('local-high');
    localTempMax.setText(`${parseInt(data.consolidated_weather[0].max_temp, 10)}°C`);
    const localWindSpeed = new DomManipulation('local-speed');
    localWindSpeed.setText(`${parseInt(data.consolidated_weather[0].wind_speed, 10)} mph`);
  }
}
