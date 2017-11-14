const paramsHash = require('./resize_params_hash');
const path = require('path');
const db = require('./../db')();
const config = require('smart-config').get('local');
const validator = require('validator');
const gm = require('gm').subClass({
  imageMagick: true
});

module.exports = (filename, fullname, params) => {
  return new Promise((resolve, reject) => {
    let results = {
      fileName: filename,
      filePath: fullname
    };

    const strHash = paramsHash(params);

    db.getCached(strHash)
      .then((cached) => {
        results.filePath = path.join(config.files_path, "/", cached);
        return resolve(results);
      },
      (err) => {
        if (err !== false) {
          reject(err);
        }

        let targetWidth = 0;
        let targetHeight = 0;

        if (typeof params.width !== 'undefined') {
          targetWidth = params.width;
        }

        if (typeof params.height !== 'undefined') {
          targetHeight = params.height;
        }

        let sourceImage = gm(fullname);

        if (validator.isInt(String(targetWidth)) && validator.isInt(String(targetHeight))) {
          sourceImage.resize(targetWidth, targetHeight);
        }

        const resultFilename = path.join(strHash + results.fileName);

        sourceImage.write(path.join(config.files_path, "/", resultFilename), (err) => {
          if (err) {
            reject(err);
          }
          db.saveCached(strHash, resultFilename).then(() => {
            results.filePath = path.join(config.files_path, "/", resultFilename);
            resolve(results);
          }).catch((err) => {
            reject(err);
          });
        });
      });

  });
};
