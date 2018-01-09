const uploadMimes = require('smart-config').get('uploadMimes');
const mmm = require('mmmagic');

module.exports = (filepath) => {
  return new Promise((resolve, reject) => {
    let magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);

    const mimesList = uploadMimes.split(" ");

    magic.detectFile(filepath, (err, result) => {
      if (uploadMimes === "" || uploadMimes === "UPLOAD_MIME_TYPES") {
        resolve(true);
      }
      if (err) {
        return reject(err);
      }
      if (result === "") {
        reject(new Error('Unable to detect MIME type'));
      }
      if (mimesList.indexOf(result) === -1) {
        return reject(new Error('MIME type not allowed'));
      }
      return resolve(true);
    });
  });

};
