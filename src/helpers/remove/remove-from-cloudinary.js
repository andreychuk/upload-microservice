const cl_client = require('cloudinary').v2;
const _ = require('lodash');

module.exports = async(key) => {
  return removeFile(key);
}

function removeFile(key) {
  return new Promise((resolve, reject) => {});
}
