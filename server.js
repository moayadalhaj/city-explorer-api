const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const axios = require('axios');
const PORT = process.env.PORT;
const weatherController = require('./controllers/weather');
const moviesController = require('./controllers/movies');

app.get('/weather', weatherController);

app.get('/movies', moviesController);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use('*', (req, res) => {
  res.status(500).send({ error: 'something went wrong' });
});
