const config = require('smart-config').get('aws');
const AWS = require('aws-sdk');

const defaultTimeout = 10000;

module.exports = function () {
  return new AWS.S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region,
    httpOptions: { timeout: defaultTimeout }
  });
};
