const beforeRequest = require('./middleware/before-request');
const afterRequest = require('./middleware/afert-request');
const feathers = require('feathers');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const services = require('./services');
const jwtSecret = require('smart-config').get('JWTSecret');
const auth = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');

const app = feathers();

app
  .configure(beforeRequest)
  .configure(hooks())
  .configure(rest())
  .configure(auth({ secret: jwtSecret }))
  .configure(jwt())
  .configure(services)
  .configure(afterRequest);

module.exports = app;
