const uploadToS3 = require('./upload-to-s3');
const uploadToCloudinary = require('./upload-to-cloudinary');
const uploadToLocal = require('./upload-to-local');
const uploadFromUrlToLocal = require('./upload-from-url-to-local.js');

module.exports = {
  uploadS3: uploadToS3,
  uploadCloudinary: uploadToCloudinary,
  uploadLocal: uploadToLocal,
  uploadFromUrlLocal: uploadFromUrlToLocal
};
