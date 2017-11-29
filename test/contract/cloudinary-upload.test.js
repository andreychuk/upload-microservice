const { test, superTest } = require('../test-env/_test_env');
const path = require('path');
const jwtSecret = require('smart-config').get('JWTSecret');
const jwt = require('jsonwebtoken');

test.beforeEach('prepare token', (t) => {
  t.context = {};
  t.context.token = 'Bearer ' + jwt.sign({}, jwtSecret);
});

test('test upload file cloudinary', async (t) => {
  const resp = await superTest.post('/cloudinary/upload')
    .attach('input', path.join(__dirname, '..', '/tmp/1.jpg'))
    .set('Authorization', t.context.token);

  t.is(resp.statusCode, 201);
});

test('test upload files cloudinary', async (t) => {
  const resp = await superTest.post('/cloudinary/upload')
    .attach('input', path.join(__dirname, '..', '/tmp/2.jpg'))
    .attach('input', path.join(__dirname, '..', '/tmp/3.jpg'))
    .set('Authorization', t.context.token);

  t.is(resp.statusCode, 201);
});
