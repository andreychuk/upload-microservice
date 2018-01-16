const uploadMimes = require('smart-config').get('uploadMimes');

module.exports = (file) => {
  return fileValidate(file);
};

const fileValidate = (file) => {
  return new Promise((resolve, reject) => {
    const mimesList = uploadMimes.split(" ");
    if (uploadMimes === "" || uploadMimes === "UPLOAD_MIME_TYPES") {
      resolve(true);
    }
    if (file.mimetype === "") {
      reject(new Error('Unable to detect MIME type'));
    }

    if (mimesList.indexOf(file.mimetype) === -1) {
      return reject(new Error('MIME type not allowed'));
    }
    return resolve(true);
  });
};
