const upload_s3 = require('./upload-to-s3');
const upload_cl = require('./upload-to-cloudinary');

module.exports = {
  uploadS3: upload_s3,
  uploadCloudinary: upload_cl
};
