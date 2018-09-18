const jwtSecret = require('smart-config').get('JWTSecret');
const jwtDisable = require('smart-config').get('JWTDisable');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  if (jwtDisable !== "true") {
    if (checkAuth(req, res) !== true) return checkAuth(req, res);
  }

  return next();
};

function checkAuth(req, res) {
  if ((typeof req.headers.authorization !== "string") || (req.headers.authorization.indexOf('Bearer ') === -1)) {
    return res.status(400).send("Bad Request");
  }

  try {

    jwt.verify(req.headers.authorization.replace('Bearer ', ''), jwtSecret);
  } catch (err) {
    return res.status(401).send('Unauthorized');
  }
  return true;
}
