const express = require('express');
const axios = require('axios');
const { graphqlHTTP } = require('express-graphql');
const {
  default: expressPlayground,
} = require('graphql-playground-middleware-express');

const { startDatabase } = require('./database');
const schema = require('./schema');
const resolvers = require('./resolvers');

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

const context = async () => {
  const db = await startDatabase();

  return { db };
};

server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    context,
  })
);

server.get('/playground', expressPlayground({ endpoint: '/graphql' }));

module.exports = server;
