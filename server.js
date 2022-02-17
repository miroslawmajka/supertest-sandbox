const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', function (req, res) {
  res.status(200).send('Hello World');
});

app.get('/user', function (req, res) {
  res.status(200).json({ name: 'john' });
});

app.get('/entries', async function (request, response) {
  axios
    .get('https://api.publicapis.org/entries')
    .then((entriesReponse) => {
      response.status(200).json(entriesReponse.data);
    })
    .catch((error) => {
      console.error(error);

      response.status(500).send('Error with third party service');
    });
});

module.exports = app;
