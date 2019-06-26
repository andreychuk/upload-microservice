const { test, superTest } = require('../test-env/_test_env');
const path = require('path');
const fs = require('fs');
const gm = require('gm').subClass({
  imageMagick: true
});
const jwtSecret = require('smart-config').get('JWTSecret');
const jwt = require('jsonwebtoken');

test.beforeEach('upload file for testing', async (t) => {
  if (typeof t.context.uploaded === 'undefined') {
    t.context = {};
    t.context.token = 'Bearer ' + jwt.sign({}, jwtSecret);

    const resp = await superTest.post('/local/upload')
      .attach('input', path.join(__dirname, '..', '/tmp/size_640_400.jpg'))
      .set('Authorization', t.context.token);

    t.is(resp.statusCode, 201);

    t.context.uploaded = resp.body;


    fs.stat(path.join(__dirname, '..', '/tmp/size_640_400.jpg'), (err, stats) => {
      if (err) {
        t.fail(err);
      }
      t.context.uploaded_filesize = stats.size;
    });
  }
});

test('test download file local', async (t) => {
  const resp = await superTest.get('/local/get/' + t.context.uploaded.key);

  t.is(resp.statusCode, 200);
  t.is(resp.type, 'image/jpeg');
  t.is(resp.headers['content-length'], String(t.context.uploaded_filesize));
});

test('test download file local + resize width', async (t) => {
  const resp = await superTest.get('/local/get/' + t.context.uploaded.key + '?w_200');

  t.is(resp.statusCode, 200);

  gm(resp.body).size((err, size) => {
    if (err) {
      t.fail(err);
    }
    t.is(size.width, 200);
  });

});

test('test download file local + resize height', async (t) => {
  const resp = await superTest.get('/local/get/' + t.context.uploaded.key + '?h_250');

  t.is(resp.statusCode, 200);
  gm(resp.body).size((err, size) => {
    if (err) {
      t.fail(err);
    }
    t.is(size.height, 250);
  });
});

test('test download file local + resize width and height', async (t) => {
  const resp = await superTest.get('/local/get/' + t.context.uploaded.key + '?w_250,h_250');

  t.is(resp.statusCode, 200);
  gm(resp.body).size((err, size) => {
    if (err) {
      t.fail(err);
    }
    t.is(size.height, 250);
    t.is(size.width, 250);
  });
});

test('test download file local + resize width non-valid arguments', async (t) => {
  const resp = await superTest.get('/local/get/' + t.context.uploaded.key + '?abracadabra');

  t.is(resp.statusCode, 200);
  // Should return original image
  t.is(resp.type, 'image/jpeg');
  t.is(resp.headers['content-length'], String(t.context.uploaded_filesize));
});

test('test download file local + crop height and width', async (t) => {
  const resp = await superTest.get('/local/get/' + t.context.uploaded.key + '?hc_250,wc_250,c_Center');

  t.is(resp.statusCode, 200);
  gm(resp.body).size((err, size) => {
    if (err) {
      t.fail(err);
    }
    t.is(size.height, 250);
    t.is(size.width, 250);
  });
});

test('test download file local + crop height and width width non-valid arguments', async (t) => {
  const resp = await superTest.get('/local/get/' + t.context.uploaded.key + '?hc_250,wc_250,c_TopLeft');

  t.is(resp.statusCode, 200);
  gm(resp.body).size((err, size) => {
    if (err) {
      t.fail(err);
    }
    t.is(size.height, 250);
    t.is(size.width, 250);
  });
});
