const { test, superTest } = require('./test-env/_test_env');
const jwtSecret = require('smart-config').get('JWTSecret');
const jwt = require('jsonwebtoken');

test('test root route', async (t) => {
  const ValidToken = 'Bearer ' + jwt.sign({}, jwtSecret);
  const { statusCode } = await superTest.get('/')
    .set('Authorization', ValidToken);
  t.is(statusCode, 200);
});
