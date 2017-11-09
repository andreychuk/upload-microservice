const config = require('smart-config').get('local');
const Promise = require('bluebird');
const fs = require('fs');
const httpError = require('http-errors');
const LocalDb = require('../db/');

module.exports = async (key) => {
  return getFile(key);
};

function getFile(key) {
  return Promise((resolve, reject) => {
    try {
      let filename = LocalDb.getFile(key);
      const fullname = config.local.files_path + filename;

      fs.readFile(fullname, (err, data) => {
        if (err) {
          throw err;
        }
        if (data) {
          return resolve();
        }
      });

    } catch (err) {
      return reject(httpError(err.statusCode, err.message));
    }
  });
}
