const remove = require('../../helpers/remove');

module.exports = {
  removeS3: (id, params) => {
    return remove.removeS3(id, params);
  },

  removeCloudinary: (id, params) => {
    return remove.removeCloudinary(id, params);
  }
};
