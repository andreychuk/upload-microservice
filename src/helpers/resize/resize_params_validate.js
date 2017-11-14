const validator = require('validator');

module.exports = (params) => {
  Object.keys(params).forEach((item) => {
    if (!(validator.isDecimal(params[item], { locale: 'en-US' }) || validator.isInt(params[item], { min: 1 }))) {
      delete params[item];
    }
  });

  return params;
};
