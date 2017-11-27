const jwtSecret = require('smart-config').get('JWTSecret');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (typeof req.headers.authorization !== "string") {
    return res.status(401).send("No Authorization");
  }
  try {
    jwt.verify(req.headers.authorization, jwtSecret);
  } catch (err) {
    return res.status(403).send('Forbidden');
  }

  return next();
};
