const config = require('smart-config').get('local');
const _ = require('lodash');
const Promise = require('bluebird');
const sqlite  = require('../db/sqlite');

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
  return Promise((resolve, reject) => {
    const filekey = sqlite.saveFile(file);
    const fileurl = '';

    resolve({ key: filekey, url: fileurl });
  });
}
