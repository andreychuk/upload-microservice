const config = require('smart-config').get('local');
const Promise = require('bluebird');
const fs = require('fs');
const httpError = require('http-errors');
const LocalDb = require('../db/')();
const path = require('path');

module.exports = async (key) => {
  return getFile(key);
};

function getFile(key) {
  return new Promise((resolve, reject) => {
    LocalDb.getFile(key).then((filename) => {
      const fullname = path.join(config.files_path, filename);
      fs.readFile(fullname, (err, data) => {
        if (err) {
          return reject(httpError(err.statusCode, err.message));
        }
        return resolve({ fileName: filename, fileData: data });
      });
    }).catch((err) => {
      return reject(httpError(err.statusCode, err.message));
    });
  });
}
