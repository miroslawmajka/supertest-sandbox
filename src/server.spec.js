const request = require('supertest');
const nock = require('nock');

const app = require('./server');
const { stopDatabase } = require('./database');

afterAll(async () => {
  await stopDatabase();
});

it('user endpoint returns the name john', async () => {
  const response = await request(app).get('/user');

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({ name: 'john' });
});

it('entries endpoint works', async () => {
  nock('https://api.publicapis.org')
    .get('/entries')
    .reply(200, { count: 1, entries: [{ john: 'smith' }] });

  const response = await request(app).get('/entries', /json/);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({ count: 1, entries: [{ john: 'smith' }] });
});

// TODO: leftover thread running with the DB - solve this
it('fetch graphql users', async () => {
  const response = await request(app)
    .post('/graphql')
    .set('Accept', 'application/json')
    .send({
      query: '{ users{ id, name} }',
    });

  expect(response.status).toEqual(200);

  // TODO: fix assertions
  // expect(response.headers['Content-Type']).toMatch(/json/);

  // console.log(response);

  // request
  //   .post('/graphql')
  //   .send({
  //     query: '{ users{ id, name} }',
  //   })
  //   .set('Accept', 'application/json')
  //   .expect('Content-Type', /json/)
  //   .expect(200)
  //   .end(function (err, res) {
  //     if (err) return done(err);
  //     expect(res.body).toBeInstanceOf(Object);
  //     expect(res.body.data.users.length).toEqual(3);
  //     done();
  //   });
});
