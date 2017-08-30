const Promise = require('bluebird');
const httpError = require('http-errors');
const ClodinaryClient = require('cloudinary').v2;

module.exports = async (key) => {
  return removeFile(ClodinaryClient, key);
};

function removeFile(client, key) {
  return new Promise((resolve, reject) => {
    client.destroy(key, (error, result) => {
      if (error) return reject(httpError(error.statusCode, error.message));
      resolve(result);
    });
  });
}
