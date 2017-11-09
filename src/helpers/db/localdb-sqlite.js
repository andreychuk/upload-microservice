const config = require('smart-config').get('db');
const sqlite3 = require('sqlite3').verbose();
const uuidv4 = require('uuid/v4');

module.exports = function () {

  const db = new sqlite3.Database(config.db_storage);

  return {

    saveFile(filename) {
      return new Promise((resolve, reject) => {
        let key = uuidv4();

        db.run("INSERT INTO storedfiles(filekey,filename) VALUES (?,?)", [key, filename], (err) => {
          if (err) {
            reject(err);
          }
          resolve(key);
        });
      });
    },

    getFile: (key) => {
      return new Promise((resolve, reject) => {
        db.get("SELECT filename FROM storedfiles WHERE filekey = ?", [key], (err, row) => {
          if (err) {
            reject(err);
          }
          resolve(row.filename);
        });
      });
    },

    deleteFile(key) {
      return new Promise((resolve, reject) => {
        db.run("DELETE FROM storedfiles WHERE filekey = ?", [key], (err) => {
          if (err) {
            reject(err);
          }
          resolve(true);
        });
      });
    },

    closeConnection: () => {
      return new Promise((resolve, reject) => {
        try {
          db.close();
        } catch (err) {
          reject(err);
        }
        resolve(true);
      });
    }
  };
};
