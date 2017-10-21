const config = require('smart-config').get('db');
const sqlite3 = require('sqlite3').verbose();
const uuidv4 = require('uuid/v4');

module.exports = function () {

  const db = new sqlite3.Database(config.db_storage);

  return {

    createTables() {
      db.run('CREATE TABLE IF NOT EXISTS storedfiles(filekey text PRIMARY KEY,filename text)');
    },

    saveFile(filename) {
      let key = uuidv4();

      db.run("INSERT INTO storedfiles(filekey,filename) VALUES (?,?)", [key, filename], (err) => {
        throw err;
      });

      return key;
    },

    getFile(key) {
      db.get(`SELECT filename FROM storedfiles WHERE filekey = ?`, [key], (err, row) => {
        if (err) {
          throw err;
        }
        return row.filename;
      });
    },

    deleteFile(key) {
      db.run(`DELETE FROM storedfiles WHERE filekey = ?`, [key], (err) => {
        throw err;
      });
    }
  };
};
