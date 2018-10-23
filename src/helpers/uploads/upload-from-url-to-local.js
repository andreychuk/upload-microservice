const config = require('smart-config').get('local');
const Promise = require('bluebird');
const httpError = require('http-errors');
const request = require('request');
const fs = require('fs');
const debug = require('debug')('app:upload-from-url-to-local');
const LocalDb = require('../db/')();
const uuidv4 = require('uuid/v4');
const path = require('path');
const validateUpload = require('../validate_upload');

module.exports = async ({ input }) => {
  return upload(input);
};

function upload(url) {
  return new Promise((resolve, reject) => {
    let fileType = "";
    const fileName = url.substring(url.lastIndexOf('/') + 1).replace(/((\?|#).*)?$/, '');
    let tempFilename = getTargetFilename(fileName);
    let tempFullname = getTargetFullname(tempFilename);
    let req = request
      .get(url)
        .on('error', (err) => {
          debug(err);
          return reject(httpError(400, err.Message));
        })
        .on('response', (response) => {
          if (tempFilename.indexOf(".") < 0) {
            fileType = '.' + (response.headers['content-type']).substring(
                (response.headers['content-type']).lastIndexOf('/') + 1
            );
          }
          tempFilename += fileType;
          tempFullname += fileType;
          const file = fs.createWriteStream(tempFullname);
          req.pipe(file)
            .on('close', () => {
              validateUpload(file)
                .catch((err) => {
                  return reject(httpError(400, err.Message));
                }).then(() => {
                  LocalDb.saveFile(tempFilename)
                    .then((filekey) => {
                      const fileurl = config.files_baseurl + 'local/get/' + filekey;
                      return resolve({
                        key: filekey,
                        url: fileurl
                      });
                    }).catch((err) => {
                      return reject(httpError(err.statusCode, err.Message));
                    });

                });
            });
        });
  });
}

function getTargetFullname(filename) {
  return path.join(config.files_path, "/", filename);
}

function getTargetFilename(filename) {
  return "" + uuidv4() + filename;
}
