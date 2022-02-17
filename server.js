const express = require('express');
const axios = require('axios');

const server = express();

server.get('/', function (_request, response) {
  response.status(200).send('Hello World');
});

server.get('/user', function (_request, response) {
  response.status(200).json({ name: 'john' });
});

server.get('/entries', async function (_request, response) {
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

module.exports = server;
