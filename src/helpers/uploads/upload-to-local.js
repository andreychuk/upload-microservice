const config = require('smart-config').get('local');
const _ = require('lodash');
const Promise = require('bluebird');
const httpError = require('http-errors');
const LocalDb = require('../db/')();
const uuidv4 = require('uuid/v4');

module.exports = async ({ input }) => {
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
    const tempFilename = getTargetFilename(file);
    file.mv(tempFilename, (err) => {
      if (err) {
        return reject(httpError(500));
      }
      try {
        const filekey = LocalDb.saveFile(tempFilename);
        const fileurl = config.files_baseurl + filekey;
        resolve({ key: filekey, url: fileurl });
      } catch (err) {
        return reject(httpError(err.statusCode, err.message));
      }
    });
  });
}

function getTargetFilename(file) {
  return config.files_path + "/" + uuidv4() + file.name;
}
