const crypto = require('crypto');

module.exports = (params, filename) => {
  let strParamsValue = filename;
  Object.keys(params).forEach((index) => {
    strParamsValue += '' + index + params[index];
  });
  const hash = crypto.createHash('sha256');
  hash.update(strParamsValue);
  return hash.digest('hex');
};
