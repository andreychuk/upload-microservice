const config = require('smart-config').get('local');
const Promise = require('bluebird');
const fs = require('fs');
const httpError = require('http-errors');
const LocalDb = require('../db/');

module.exports = async (key) => {
  return removeFile(key);
};

function removeFile(filekey) {
  return Promise((resolve, reject) => {
    try {
      // Loading filename by key
      let filename = LocalDb.getFile(filekey);

      const fullname = config.local.files_path + filename;
      
      // Deleting file
      fs.unlink(fullname, (err) => {
        if (err) throw err;
        resolve({ message: 'OK' });
      });
    } catch (err) {
      return reject(httpError(err.statusCode, err.message));
    }
  });
}
