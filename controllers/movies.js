const axios = require('axios');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Movie = require('../module/movie')
const moviesController = (req, res) => {
  let location = req.query.query;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&page=1&query=${location}`
  axios.get(url).then(response => {
    let moviesData = response.data.results.map(element => new Movie(element));
    res.send(moviesData);
  })
}

module.exports = moviesController;