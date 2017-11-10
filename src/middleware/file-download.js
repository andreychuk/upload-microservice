
module.exports = (req, res, next) => {
  if (typeof res.data.fileName !== 'undefined' && typeof res.data.filePath !== 'undefined') {
    return res.download(res.data.filePath);
  }
  next();
};
