const correlation = require('express-mw-correlation-id');
const sentry = require('../../helpers/sentry');
const debug = require('debug')('app:request');
const logger = require('simple-express-logger');
const compress = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = function () {
  const app = this;

  app.use(compress())
    .options('*', cors())
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(correlation(true))
    .use(logger({
      customOutput: debug,
      extraFields: ['headers', 'body', 'id']
    }))
    .use(sentry.requestHandler);
};
