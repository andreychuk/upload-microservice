const client = require('../client/s3-client');
const config = require('smart-config').get('aws');
const uuid = require('uuid');
const _ = require('lodash');
const Promise = require('bluebird');
const httpError = require('http-errors');
const validateUpload = require('../validate_upload');

module.exports = async ({
  input
}) => {
  return uploadMany(client(), input, config.bucketName);
};


function upload(client, file, bucket) {
  return new Promise((resolve, reject) => {

    validateUpload(file).catch((err) => {
      return reject(httpError(400, err.Message));
    }).then(() => {
      let contentDisposition = 'inline; filename="' + file.name + '"';
      if ((file.mimetype.toLowerCase()).includes('csv')) {
        contentDisposition = 'attachment; filename="' + file.name + '"'; // save original file name for downloading
      }
      client.upload({
        Bucket: bucket,
        Key: createUniqueFileName(file),
        Body: file.data,
        ContentType: file.mimetype,
        ContentDisposition: contentDisposition
      }, (err, data) => {
        if (err) return reject(httpError(err.statusCode, err.message));
        resolve({
          key: data.key,
          url: data.Location
        });
      });
    });

  });
}

function uploadMany(client, files, bucket) {
  if (_.isArray(files)) {
    return Promise.map(files, (file) => {
      return upload(client, file, bucket);
    });
  }
  return upload(client, files, bucket);
}

function createUniqueFileName(file) {
  const [fileName, ...extension] = file.name.split(".");
  return [fileName, uuid(), ...extension].join('.');
}
