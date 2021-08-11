const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const Forecast = require('../module/weatherday');
const weatherController = (req, res) => {
  let latitude = req.query.lat;
  let longitude = req.query.lon;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}`
  axios.get(url).then(response => {
    let searchedCityData = response.data.data.map(element => new Forecast(element));
    res.send(searchedCityData);
  })
}

module.exports = weatherController;
