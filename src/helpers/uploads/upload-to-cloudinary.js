const ClodinaryClient = require('cloudinary').v2;
const _ = require('lodash');

const config = require('smart-config').get('cloudinary');

module.exports = async ({ input }) => {
  return uploadMany(ClodinaryClient(), input, config.bucketName);
};

function upload() {
  
}

function uploadMany(client, files, bucket) {
  if (!_.isArray(files)) {
    files = [files];
  }
  return upload(client, files, bucket);
}
