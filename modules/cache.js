'use strict';

class Cache {
  constructor() {
    this.forcastData = [];
    this.moviesCacheData = [];
    this.timeStamp = Date.now();
  }
}

module.exports = Cache;
