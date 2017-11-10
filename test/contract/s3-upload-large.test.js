const { test, superTest } = require('../test-env/_test_env');
const path = require('path');
const jsonTool = require('../../src/helpers/json.js');

test('test upload large file', async (t) => {
  const resp = await superTest.post('/s3/upload')
    .attach('input', path.join(__dirname, '..', '/tmp/large.jpg'));

  t.is(resp.statusCode, 201);
  t.is(jsonTool.isJSON(resp.text), true);
  let respData = jsonTool.parseJSON(resp.text);
  t.is((typeof respData.key === 'undefined'), false);
  t.is((typeof respData.url === 'undefined'), false);
});
