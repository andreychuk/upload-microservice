const { test, superTest } = require('./test-env/_test_env');

test('test root route', async (t) => {
  const { statusCode } = await superTest.get('/');
  t.is(statusCode, 200);
});
