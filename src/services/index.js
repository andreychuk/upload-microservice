const packageJson = require('../../package.json');
const { serverStatus } = require('node-helpers');

const upload = require('./upload/file-upload');
const removeFile = require('./remove/file-remove');

const fileUpload = require('express-fileupload');
const filesToBody = require('../middleware/files-to-body');

module.exports = function () {
  const app = this;

  app.service('/', { find: serverStatus(packageJson) });

  app.use(fileUpload());
  app.use(filesToBody);

  app.service('/s3/upload', { create: upload.uploadS3 });

  app.service('/s3/remove', { remove: removeFile.removeS3 });

  app.service('/cloudinary/upload', { create: upload.uploadCloudinary });

  app.service('/cloudinary/remove', { remove: removeFile.removeCloudinary });

};
