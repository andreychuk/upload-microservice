const config = require('smart-config').get('local');
const Promise = require('bluebird');
const fs = require('fs');
const httpError = require('http-errors');
const LocalDb = require('../db/')();
const path = require('path');
const resize = require('../resize');

module.exports = async (key, params) => {
  return getFile(key, params);
};

function getFile(key, params) {
  return new Promise((resolve, reject) => {
    LocalDb.getFile(key).then((filename) => {
      const fullname = path.join(config.files_path, filename);
      fs.open(fullname, 'r', (err) => {
        if (err) {
          return reject(httpError(err.statusCode, err.message));
        }

        if (Object.keys(params.query).length < 0) {
          return resize.process(filename, fullname, params);
        }
        return resolve({ fileName: filename, filePath: fullname });
      });
    }).catch((err) => {
      return reject(httpError(err.statusCode, err.message));
    });
  });
}
