const data = require('./data');

const resolvers = {
  users: async (_, context) => {
    // TODO: enable when DB can run with tests
    // const { db } = await context();
    // return db.collection('users').find().toArray();

    return data.Users;
  },
  user: async ({ id }, context) => {
    // TODO: enable when DB can run with tests
    // const { db } = await context();
    // return db.collection('users').findOne({ id });

    return data.Users[0];
  },
};

module.exports = resolvers;
