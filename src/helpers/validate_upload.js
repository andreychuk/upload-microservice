const uploadMimes = require('smart-config').get('uploadMimes');

module.exports = (file) => {
  return new Promise((resolve, reject) => {
    const mimesList = uploadMimes.split(" ");
    if (uploadMimes === "" || uploadMimes === "UPLOAD_MIME_TYPES") {
      resolve(true);
    }
    if (file.mimeType === "") {
      reject(new Error('Unable to detect MIME type'));
    }

    if (mimesList.indexOf(file.mimeType) === -1) {
      return reject(new Error('MIME type not allowed'));
    }
    return resolve(true);
  });
};
