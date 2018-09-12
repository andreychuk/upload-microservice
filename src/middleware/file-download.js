
module.exports = (req, res, next) => {
  if (typeof res.data.fileName !== 'undefined' && typeof res.data.filePath !== 'undefined') {
    res.header = Object.assign(res.header, { ContentDisposition: "inline; filename=" + res.data.fileName });
    return res.download(res.data.filePath);
  }
  next();
};
