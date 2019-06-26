const paramsHash = require('./crop_params_hash');
const paramsSanitize = require('./crop_params_sanitize');
const path = require('path');
const db = require('./../db')();
const config = require('smart-config').get('local');
const gm = require('gm').subClass({
  imageMagick: true
});

module.exports = (filename, fullname, params) => {

  return new Promise((resolve, reject) => {
    let results = {
      fileName: filename,
      filePath: fullname
    };

    if (Object.keys(params).length === 0) {
      return resolve(results);
    }

    const strHash = paramsHash(params, filename);

    db.getCached(strHash, params)
      .then((cached) => {
        results.filePath = path.join(config.files_path, "/", cached);
        return resolve(results);
      },
      (err) => {
        if (err !== false) {
          return reject(err);
        }

        let sourceImage = gm(fullname);

        sourceImage.size((err, size) => {
          if (err) {
            return reject(err);
          }
          let resizeDimensions = paramsSanitize
            .parseParams(params.width || 0, params.height || 0, size.width, size.height);

          if (resizeDimensions.width > 0 && resizeDimensions.height > 0) {
            sourceImage.gravity(params.crop).crop(resizeDimensions.width, resizeDimensions.height);
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

  });
};
