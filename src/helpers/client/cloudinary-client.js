const ClodinaryClient = require('cloudinary').v2;
const config = require('smart-config').get('cloudinary');

module.exports = function () {
  ClodinaryClient.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret
  });
  return ClodinaryClient;
};
