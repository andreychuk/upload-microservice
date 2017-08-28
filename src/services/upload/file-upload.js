const upload = require('../../helpers/uploads');

module.exports = {

  uploadS3: (body, params) => {
    return upload.uploadS3(body.files, params);
  },

  uploadCloudinary: (body,params) => {
    return upload.uploadCloudinary(body.file,params);
  }
};
