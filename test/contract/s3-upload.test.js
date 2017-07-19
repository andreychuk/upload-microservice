const { test, superTest } = require('../test-env');

test('test upload file', async (t) => {
  const { statusCode } = await superTest.post('/s3/upload').attach('input', '/tmp/1.jpg').send();
  t.is(statusCode, 201);
});

test('test upload files', async (t) => {
  const { statusCode } = await superTest.post('/s3/upload')
                                        .attach('input', '/tmp/2.jpg')
                                        .attach('input', '/tmp/3.jpg').send();
  t.is(statusCode, 201);
});
