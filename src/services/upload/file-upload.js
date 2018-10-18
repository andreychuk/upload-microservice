const upload = require('../../helpers/uploads');

module.exports = {

  uploadS3: (body, params) => {
    return upload.uploadS3(body.files, params);
  },

  uploadCloudinary: (body, params) => {
    return upload.uploadCloudinary(body.files, params);
  },

  uploadLocal: (body, params) => {
    return upload.uploadLocal(body.files, params);
  },

  uploadFromUrlLocal: (body, params) => {
    return upload.uploadFromUrlLocal(body, params);
  }
};
