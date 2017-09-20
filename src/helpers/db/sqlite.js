const config = require('smart-config').get('local');
const sqlite3 = require('sqlite3').verbose();
const uuid = require('uuid/v4');

module.exports = function () {

  let db = new sqlite3.Database(config.db_storage);
  
  return {
    createTables() {
      db.run('CREATE TABLE IF NOT EXISTS storedfiles(filekey text PRIMARY KEY,filename text)');
    },
    saveFile(filename) {
      let key = '';

      return key;
    },

    getFile(key) {
      let filename = '';

      return filename;
    }
  }
};
