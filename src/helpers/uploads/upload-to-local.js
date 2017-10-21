const config = require('smart-config').get('local');
const _ = require('lodash');
const Promise = require('bluebird');
const httpError = require('http-errors');
const LocalDb = require('../db/')();

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
    try {
      const filekey = LocalDb.saveFile(file);
      const fileurl = config.local.flies_baseurl + filekey;
      resolve({ key: filekey, url: fileurl });
    } catch (err) {
      return reject(httpError(err.statusCode, err.message));
    }
  });
}
