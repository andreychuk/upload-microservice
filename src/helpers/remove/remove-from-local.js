const Promise = require('bluebird');

module.exports = async (key) => {
  return removeFile(key);
};

function removeFile(key) {
  return Promise((resolve,reject) => {
    // Loading filename by key
    // Deleting file
    
  });
}
