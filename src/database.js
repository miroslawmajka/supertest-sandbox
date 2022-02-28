const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const data = require('./data');

let database = null;
let mongo = null;
let connection = null;

async function startDatabase() {
  // Initialise Database
  if (!mongo) {
    mongo = await MongoMemoryServer.create();

    const mongoDBURL = await mongo.getUri();

    console.log(`Mongo DB URL: ${mongoDBURL}`);

    connection = await MongoClient.connect(mongoDBURL, {
      useNewUrlParser: true,
    });
  }

  // Seed Database
  if (!database) {
    database = connection.db();

    await database.collection('users').insertMany(data.Users);
  }

  return database;
}

async function stopDatabase() {
  if (mongo) {
    await mongo.stop();
  }
}

module.exports = {
  startDatabase,
  stopDatabase,
};
