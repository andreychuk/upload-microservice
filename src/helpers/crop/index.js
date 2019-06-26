const cropImage = require('./crop_image.js');
const cropValidateParams = require('./crop_params_validate.js');
const cropParseParams = require('./crop_params_parse.js');
const cropHashParams = require('./crop_params_hash.js');

module.exports = {
  cropProcess: cropImage,
  cropParamsParse: cropParseParams,
  cropParamsValidate: cropValidateParams,
  cropParamsHash: cropHashParams
};
