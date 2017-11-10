process.env.NODE_ENV = 'test';

const app = require('../../src/app');
const superTest = require('supertest-promised')(app);
const test = require('ava');


module.exports = { superTest, app, test };
