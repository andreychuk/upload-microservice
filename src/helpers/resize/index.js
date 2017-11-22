const imageResize = require('./resize_image.js');
const validateParams = require('./resize_params_validate.js');
const parseParams = require('./resize_params_parse.js');
const hashParams = require('./resize_params_hash.js');

module.exports = {
  process: imageResize,
  paramsParse: parseParams,
  paramsValidate: validateParams,
  paramsHash: hashParams
};
