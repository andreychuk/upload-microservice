const config = require('smart-config').get('db');
const sqliteDriver = require('./localdb-sqlite');

module.exports = sqliteDriver;

if (config.driver === 'sqlite') {
  module.exports = sqliteDriver;
}
