module.exports = (req, res, next) => {
  if (req.files) req.body.files = req.files || [];
  next();
};
