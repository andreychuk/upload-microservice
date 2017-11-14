
module.exports = (req, res, next) => {
  if (typeof res.data.fileName !== 'undefined' && typeof res.data.filePath !== 'undefined') {
    console.log('handling download', res.data);
    return res.download(res.data.filePath);
  }
  next();
};
