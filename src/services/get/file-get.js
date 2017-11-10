const get = require('../../helpers/get');

module.exports = {
  getLocal: (id, params) => {
    return get.getLocal(id, params);
  }
};
