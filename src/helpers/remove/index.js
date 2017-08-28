const removeFile_s3 = require('./remove-from-s3');
const removeFile_cl = require('./remove-from-cloudinary');

module.exports = {
  removeS3 : removeFile_s3,
  removeCloudinary : removeFile_cl
};
