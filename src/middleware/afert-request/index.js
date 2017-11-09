const errorHandler = require('./errorhandler');
const notFound = require('./not-found-handler');
const sentry = require('../../helpers/sentry');
const fileDownload = require('./file-download');

module.exports = function () {
  const app = this;

  app.use(notFound())
    .use(errorHandler())
    .use(sentry.errorHandler);

  app.configure(fileDownload);
};
