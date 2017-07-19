const { test, superTest } = require('./test-env');

test('test root route', async (t) => {
  const { statusCode } = await superTest.get('/');
  t.is(statusCode, 200);
});
