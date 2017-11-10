const debug = require('debug')('app:error-handler');

module.exports = () => (err, req, res, next) => {
  const code = err.code || err.status || 500;
  if (!err) return next();
  if (code >= 500) debug(err);

  return res.status(code).send(err.message + err.stack);
};
