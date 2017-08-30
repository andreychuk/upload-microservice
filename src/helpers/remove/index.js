const removeFileS3 = require('./remove-from-s3');
const removeFileCL = require('./remove-from-cloudinary');

module.exports = {
  removeS3: removeFileS3,
  removeCloudinary: removeFileCL
};
