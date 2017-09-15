const ClodinaryClient = require('cloudinary').v2;
const _ = require('lodash');
const Promise = require('bluebird');
const httpError = require('http-errors');
const config = require('smart-config').get('cloudinary');

module.exports = async ({ input }) => {
  ClodinaryClient.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret
  });
  return uploadMany(ClodinaryClient, input);
};

function upload(client, file) {
  return new Promise((resolve, reject) => {
    client.uploader.upload(file, (error, result) => {
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
