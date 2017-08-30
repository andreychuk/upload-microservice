const uploadToS3 = require('./upload-to-s3');
const uploadToCloudinary = require('./upload-to-cloudinary');

module.exports = {
  uploadS3: uploadToS3,
  uploadCloudinary: uploadToCloudinary
};
