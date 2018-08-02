const jwtSecret = require('smart-config').get('JWTSecret');
const jwtDisable = require('smart-config').get('JWTDisable')
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  if (jwtDisable === true) return next();

  if (typeof req.headers.authorization !== "string") {
    return res.status(400).send("Bad Request");
  }

  if (req.headers.authorization.indexOf('Bearer ') === -1) {
    return res.status(400).send("Bad Request");
  }

  try {
    jwt.verify(req.headers.authorization.replace('Bearer ', ''), jwtSecret);
  } catch (err) {
    return res.status(401).send('Unauthorized');
  }

  return next();
};
