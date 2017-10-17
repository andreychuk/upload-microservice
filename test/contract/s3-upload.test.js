const { test, superTest } = require('../test-env');
const path = require('path');

test('test upload file', async (t) => {
  const { statusCode } = await superTest.post('/s3/upload')
    .attach('input', path.join(__dirname, '..', '/tmp/1.jpg'))
    .send();
  t.is(statusCode, 201);
});

test('test upload files', async (t) => {
  const { statusCode } = await superTest.post('/s3/upload')
    .attach('input', path.join(__dirname, '..', '/tmp/2.jpg'))
    .attach('input', path.join(__dirname, '..', '/tmp/3.jpg'))
    .send();
  t.is(statusCode, 201);
});
