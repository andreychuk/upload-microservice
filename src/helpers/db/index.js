const config = require('smart-config').get('db');
const sqlite = require('./localdb-sqlite');

module.exports = sqlite;

if (config.db.driver === 'sqlite') {
  module.exports = sqlite;
}
