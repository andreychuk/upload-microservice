const Promise = require('bluebird');
const httpError = require('http-errors');
const client = require('../client/cloudinary-client');

module.exports = async (key) => {
  return removeFile(client, key);
};

function removeFile(client, key) {
  return new Promise((resolve, reject) => {
    client().uploader.destroy(key, (error, result) => {
      if (error) return reject(httpError(error.statusCode, error.message));
      resolve(result);
    });
  });
}
