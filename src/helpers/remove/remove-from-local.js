const Promise = require('bluebird');

module.exports = async (key) => {
  return removeFile(key);
};

function removeFile(key) {
  return new Promise((resolve,reject) => {
    
  });
}
