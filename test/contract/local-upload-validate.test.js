const { test, superTest } = require('../test-env/_test_env');
const path = require('path');
const jwtSecret = require('smart-config').get('JWTSecret');
const jwt = require('jsonwebtoken');
const uploadMimes = require('smart-config').get('uploadMimes');

test.beforeEach('preparing jwt token', (t) => {
  t.context = {};
  t.context.token = 'Bearer ' + jwt.sign({}, jwtSecret);
});

test('test validate single image file', async (t) => {
  const resp = await superTest.post('/local/upload')
    .attach('input', path.join(__dirname, '..', '/tmp/1.jpg'))
    .set('Authorization', t.context.token);

  t.is(resp.statusCode, 201);
});

test('test validate single text file', async (t) => {
  const resp = await superTest.post('/local/upload')
    .attach('input', path.join(__dirname, '..', '/tmp/1.txt'))
    .set('Authorization', t.context.token);

  if (uploadMimes === 'UPLOAD_MIME_TYPES' || uploadMimes === '') {
    t.is(resp.statusCode, 201);
  } else {
    t.is(resp.statusCode, 400);
  }
});
