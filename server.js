const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const axios = require('axios');
const PORT = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

app.get('/weather', (req, res) => {
  let latitude = req.query.lat;
  let longitude = req.query.lon;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}`
  axios.get(url).then(response => {
    let searchedCityData = response.data.data.map(element => new Forecast(element));
    res.send(searchedCityData);
  })
})
app.get('/movies', (req, res) => {
  let location = req.query.query;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&page=1&query=${location}`
  axios.get(url).then(response => {
    let moviesData = response.data.results.map(element => new Movie(element));
    res.send(moviesData);
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use('*', (req, res) => {
  res.status(500).send({ error: 'something went wrong' });
});

class Forecast {
  constructor(elements) {
    this.description = `low of ${elements.low_temp} , high of ${elements.max_temp} with ${elements.weather.description}`;
    this.date = elements.datetime;
  }
}

class Movie {
  constructor(elements) {
    this.title = elements.title;
    this.overview = elements.overview;
    this.average_votes = elements.vote_average;
    this.total_votes = elements.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${elements.poster_path}`;
    this.popularity = elements.popularity;
    this.released_on = elements.release_date;
  }
}