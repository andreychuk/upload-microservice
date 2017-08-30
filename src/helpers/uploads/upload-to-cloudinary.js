const ClodinaryClient = require('cloudinary').v2;
const _ = require('lodash');
const Promise = require('bluebird');
const httpError = require('http-errors');

module.exports = async ({ input }) => {
  return uploadMany(ClodinaryClient, input);
};

function upload(client, file) {
  return new Promise((resolve, reject) => {
    client.upload(file, (error, result) => {
      if (error) return reject(httpError(error.statusCode, error.message));
      resolve({ key: result.public_id, url: result.url });
    });
  });
}

function uploadMany(client, files) {
  if (!_.isArray(files)) {
    files = [files];
  }

  return Promise.map(files, (file) => {
    return upload(client, file);
  });
}
