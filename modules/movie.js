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
module.exports = Movie;