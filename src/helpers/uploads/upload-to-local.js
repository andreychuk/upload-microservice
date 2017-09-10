const config = require('smart-config').get('local');
const _ = require('lodash');
const Promise = require('bluebird');

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

  });
}
