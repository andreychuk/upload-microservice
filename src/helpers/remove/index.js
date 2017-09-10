const removeFileS3 = require('./remove-from-s3');
const removeFileCL = require('./remove-from-cloudinary');
const removeFileLocal = require('./remove-from-local');

module.exports = {
  removeS3: removeFileS3,
  removeCloudinary: removeFileCL,
  removeLocal: removeFileLocal
};
