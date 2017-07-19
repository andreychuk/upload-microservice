const beforeRequest = require('./middleware/before-request');
const afterRequest = require('./middleware/afert-request');
const feathers = require('feathers');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const services = require('./services');

const app = feathers();

app
  .configure(beforeRequest)
  .configure(hooks())
  .configure(rest())
  .configure(services)
  .configure(afterRequest);

module.exports = app;
