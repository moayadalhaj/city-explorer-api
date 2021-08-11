class Forecast {
  constructor(elements) {
    this.description = `low of ${elements.low_temp} , high of ${elements.max_temp} with ${elements.weather.description}`;
    this.date = elements.datetime;
  }
}

module.exports = Forecast;
