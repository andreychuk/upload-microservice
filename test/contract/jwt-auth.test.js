const { test, superTest } = require('../test-env/_test_env');
const jwtSecret = require('smart-config').get('JWTSecret');
const jwt = require('jsonwebtoken');

test('request without auth token', async (t) => {
  const resp = await superTest.get('/');

  t.is(resp.statusCode, 400);
});

test('request with invalid token', async (t) => {
  const resp = await superTest.get('/').set('Authorization', 'abracadabra');

  t.is(resp.statusCode, 400);
});

test('request with invalid token and Bearer', async (t) => {
  const resp = await superTest.get('/').set('Authorization', 'Bearer abracadabra');

  t.is(resp.statusCode, 401);
});

test('request with valid token', async (t) => {
  const ValidToken = 'Bearer ' + jwt.sign({
  }, jwtSecret);

  const resp = await superTest.get('/').set('Authorization', ValidToken);


  t.is(resp.statusCode, 200);
});


test('request with valid token but no Bearer', async (t) => {
  const ValidToken = jwt.sign({}, jwtSecret);

  const resp = await superTest.get('/').set('Authorization', ValidToken);

  t.is(resp.statusCode, 400);
});

test('request  with token expired', async (t) => {
  const ValidToken = 'Bearer ' + jwt.sign({
    iat: Math.floor(Date.now() / 1000) - 30 },
  jwtSecret, { expiresIn: 1 });

  const resp = await superTest.get('/').set('Authorization', ValidToken);


  t.is(resp.statusCode, 401);
});
