const Raven = require('raven');
const debug = require('debug')('app');

const dsn = process.env.SENTRY_DSN;

function init() {
  const client = new Raven.Client(dsn);
  client.patchGlobal((logged, err) => {
    debug(err.stack);
  });
}

if (dsn) init();

module.exports = {
  errorHandler: Raven.middleware.express.errorHandler(dsn),
  requestHandler: Raven.middleware.express.requestHandler(dsn)
};
