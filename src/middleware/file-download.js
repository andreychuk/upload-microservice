const path = require('path');

module.exports = (req, res, next) => {
  if (typeof res.data.fileName !== 'undefined' && typeof res.data.filePath !== 'undefined') {
    return res.sendFile(path.resolve(res.data.filePath));
  }
  next();
};
