const axios = require('axios');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Movie = require('../modules/movie');
const Cache = require('../modules/cache');
let moviesCache = new Cache([]);

const moviesController = (req, res) => {

  let location = req.query.query;

  if (((Date.now() - moviesCache.timeStamp) > 86400000)) {
    moviesCache = new Cache([]);
  }
  if (moviesCache.moviesCacheData.length) {
    const filteredData = moviesCache.moviesCacheData.find(element => {
      return element.location === location;
    })

    if (filteredData) {
      res.send(filteredData.data);
    } else {
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&page=1&query=${location}`
      axios.get(url).then(response => {
        let moviesData = response.data.results.map(element => new Movie(element));
        moviesCache.moviesCacheData.push({ location: req.query.query, data: moviesData });
        res.send(moviesData);
      })
    }
  } else {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&page=1&query=${location}`
    axios.get(url).then(response => {
      let moviesData = response.data.results.map(element => new Movie(element));
      moviesCache.moviesCacheData.push({ location: req.query.query, data: moviesData });
      res.send(moviesData);
    })
  }
}

module.exports = moviesController;
