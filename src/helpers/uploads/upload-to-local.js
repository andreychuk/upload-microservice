const config = require('smart-config').get('local');
const _ = require('lodash');
const Promise = require('bluebird');
const httpError = require('http-errors');
const LocalDb = require('../db/')();
const uuidv4 = require('uuid/v4');
const path = require('path');
const validateUpload = require('../validate_upload');

module.exports = async ({
  input
}) => {
  return uploadMany(input);
};

function uploadMany(files) {
  if (_.isArray(files)) {
    return Promise.map(files, (file) => {
      return upload(file);
    });
  }
  return upload(files);
}

function upload(file) {
  return new Promise((resolve, reject) => {
    const tempFilename = getTargetFilename(file.name);
    const tempFullname = getTargetFullname(tempFilename);

    file.mv(tempFullname, (err) => {
      if (err) {
        return reject(httpError(500));
      }

      validateUpload(file)
        .catch((err) => {
          return reject(httpError(400, err.Message));
        }).then(() => {
          LocalDb.saveFile(tempFilename)
            .then((filekey) => {
              const fileurl = config.files_baseurl + 'local/get/' + filekey;
              return resolve({
                key: filekey,
                url: fileurl
              });
            }).catch((err) => {
              return reject(httpError(err.statusCode, err.Message));
            });

        });
    });
  });
}

function getTargetFullname(filename) {
  return path.join(config.files_path, "/", filename);
}

function getTargetFilename(filename) {
  return "" + uuidv4() + filename;
}
