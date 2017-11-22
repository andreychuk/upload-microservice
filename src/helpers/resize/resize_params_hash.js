const crypto = require('crypto');

module.exports = (params) => {
  let strParamsValue = '';
  Object.keys(params).forEach((index) => {
    strParamsValue += '' + index + params[index];
  });
  const hash = crypto.createHash('sha256');
  hash.update(strParamsValue);
  return hash.digest('hex');
};
