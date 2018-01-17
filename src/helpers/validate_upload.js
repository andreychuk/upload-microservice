const uploadMimes = require('smart-config').get('uploadMimes');

module.exports = (file) => {
  return fileValidate(file);
};

const fileValidate = (file) => {
  return new Promise((resolve, reject) => {
    const mimesList = fileValidateGetMimes();

    if (mimesList === false) {
      return resolve(true);
    }

    fileValidateCheckMimeType(file.mimeType, mimesList)
      .catch((error) => { return reject(error); })
      .done(() => { return resolve(true); });
  });
};

const fileValidateGetMimes = () => {
  if (uploadMimes === "" || uploadMimes === "UPLOAD_MIME_TYPES") {
    return false;
  }
  return uploadMimes.split(" ");
};

const fileValidateCheckMimeType = async (mimetype, mimesList) => {
  if (mimetype === "") {
    throw new Error('Unable to detect MIME type');
  }

  if (mimesList.indexOf(mimetype) === -1) {
    throw new Error('MIME type not allowed');
  }
  return true;
};
