process.env.NODE_ENV = 'test';

const app = require('../../src/app');
const superTest = require('supertest-promised')(app);
const test = require('ava');


test('dummy test', (t) => {
  t.is(true, true);
});

module.exports = { superTest, app, test };
