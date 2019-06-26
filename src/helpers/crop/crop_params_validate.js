const validator = require('validator');

module.exports = (params) => {
  Object.keys(params).forEach((item) => {
    if (validator.isDecimal(params[item], { locale: 'en-US' })) {
      params[item] = parseFloat(params[item]);
    } else if (validator.isInt(params[item], { min: 1 })) {
      params[item] = parseInt(params[item], 10);
    } else if (validator.isIn(
      params[item],
      ['NorthWest', 'North', 'NorthEast', 'West', 'Center', 'East', 'SouthWest', 'South', 'SouthEast']
    )) {
      params[item] = params[item];
    } else {
      delete (params[item]);
    }
  });

  return params;
};
