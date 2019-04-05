const client = require('../client/cloudinary-client');
const _ = require('lodash');
const Promise = require('bluebird');
const httpError = require('http-errors');
const config = require('smart-config').get('local');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const validateUpload = require('../validate_upload');

module.exports = async ({
  input
}) => {
  return uploadMany(client(), input);
};

function upload(client, file) {
  return new Promise((resolve, reject) => {
    const tempFilename = getTempFilename(file);

    file.mv(tempFilename, (err) => {
      if (err) {
        return reject(httpError(500));
      }

      validateUpload(file).catch((err) => {
        return reject(httpError(400, err.Message));
      }).then(() => {
        client.uploader.upload(tempFilename, (error, result) => {
          fs.unlink(tempFilename, (err) => {
            return reject(httpError(500, err));
          });
          if (error) return reject(httpError(error.statusCode, error.message));
          resolve({
            key: result.public_id,
            url: result.secure_url
          });
        });
      });
    });
  });
}

function uploadMany(client, files) {
  if (_.isArray(files)) {
    return Promise.map(files, (file) => {
      return upload(client, file);
    });
  }

  return upload(client, files);
}

function getTempFilename(file) {
  return config.files_temp + "/" + uuidv4() + file.name;
}
