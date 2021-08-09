const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;

const weatherData = require('./data/weather.json');
app.get('/weather', (req, res) => {
  let searchedCity = req.query.searchQuery;
  const cities = ['seattle', 'paris', 'amman'];
  if (!cities.includes(searchedCity.toLowerCase())) {
    res.status(404).send('No Data For this City');
  } else {
    let foundData = weatherData.find(element => element.city_name.toLowerCase() === searchedCity.toLowerCase());
    let searchedCityData = foundData.data.map(element => new Forecast(element));
    res.send(searchedCityData);
  }

})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
app.use('*', (req, res) => {
  res.status(500).send({ error: 'something went wrong' });
});
class Forecast {

  constructor(elements) {
    this.descreption = `low of ${elements.low_temp} , high of ${elements.max_temp} with ${elements.weather.description}`;
    this.date = elements.valid_date;
  }
}
