const client = require('../client/s3-client');
const config = require('smart-config').get('aws');
const Promise = require('bluebird');
const httpError = require('http-errors');

module.exports = async (key) => {
  return removeFile(client(), key, config.bucketName);
};

function removeFile(client, key, bucket) {
  return new Promise((resolve, reject) => {
    client.deleteObject({
      Bucket: bucket,
      Key: key
    }, (err, data) => {
      if (err) return reject(httpError(err.statusCode, err.message));
      resolve(data);
    });
  });
}
