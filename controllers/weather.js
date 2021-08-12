const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const Forecast = require('../modules/weatherday');
const Cache = require('../modules/cache');
let weatherCache = new Cache([]);


const weatherController = (req, res) => {

  let latitude = req.query.lat.slice(0, 5);
  let longitude = req.query.lon.slice(0, 5);

  if (((Date.now() - weatherCache.timeStamp) > 86400000)) {
    weatherCache = new Cache([]);
  }
  if (weatherCache.forcastData.length) {
    const filteredData = weatherCache.forcastData.find(element => {
      return (String(element.lat) === latitude && String(element.lon) === longitude);
    })
    if (filteredData) {
      res.send({ message: 'This data From cache', data: filteredData.data });
    } else {
      let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}`
      axios.get(url).then(response => {
        let searchedCityData = response.data.data.map(element => new Forecast(element));
        weatherCache.forcastData.push({ lat: response.data.lat, lon: response.data.lon, data: searchedCityData });
        res.send({ message: 'This data From API', data: searchedCityData });
      })
    }
  } else {
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}`
    axios.get(url).then(response => {
      let searchedCityData = response.data.data.map(element => new Forecast(element));
      weatherCache.forcastData.push({ lat: response.data.lat, lon: response.data.lon, data: searchedCityData });
      res.send({ message: 'This data From API', data: searchedCityData });
    })
  }
}

module.exports = weatherController;
