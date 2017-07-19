const upload = require('../../helpers/uploads');

module.exports = (body) => {
  return upload(body.files);
};
