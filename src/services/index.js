const packageJson = require('../../package.json');
const { serverStatus } = require('node-helpers');

const upload = require('./upload/file-upload');
const removeFile = require('./remove/file-remove');
const getFile = require('./get/file-get');

const fileUpload = require('express-fileupload');
const filesToBody = require('../middleware/files-to-body');
const fileDownload = require('../middleware/file-download');

const jwtAuth = require('../middleware/before-request/jwt-auth');

module.exports = function () {
  const app = this;

  app.use('/', jwtAuth, { find: serverStatus(packageJson) });

  app.use(fileUpload());
  app.use(filesToBody);

  app.use('/s3/upload', jwtAuth, { create: upload.uploadS3 });

  app.use('/s3/remove', jwtAuth, { remove: removeFile.removeS3 });

  app.use('/cloudinary/upload', jwtAuth, { create: upload.uploadCloudinary });

  app.use('/cloudinary/remove', jwtAuth, { remove: removeFile.removeCloudinary });

  app.use('/local/upload', jwtAuth, { create: upload.uploadLocal });

  app.use('/local/upload-from-url', jwtAuth, { create: upload.uploadFromUrlLocal });

  app.use('/local/remove', jwtAuth, { remove: removeFile.removeLocal });

  app.use('/local/get', { get: getFile.getLocal }, fileDownload);
};
