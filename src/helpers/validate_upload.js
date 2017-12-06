const uploadMimes = require('smart-config').get('uploadMimes');
const mmm = require('mmmagic').Magic();

module.exports = (filepath) => {
  let magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);

  const mimesList = uploadMimes.split(" ");
  return Promise((resolve, reject) => {
    // No valid types defined - all mime-types considered valid
    if (mimesList.length === 0) {
      resolve(true);
    }
    magic.detectFile(filepath, (err, result) => {
      if (err) { reject(err); }
      if (result === "") {
        reject(false);
      }
      resolve(mimesList.indexOf(result) !== -1);
    });
  });

};
