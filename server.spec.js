const request = require('supertest');
const nock = require('nock');

const app = require('./server');

it('john endpoint works', async () => {
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
