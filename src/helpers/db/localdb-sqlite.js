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
            return reject(err);
          }
          return resolve(key);
        });
      });
    },

    getFile: (key) => {
      return new Promise((resolve, reject) => {
        db.get("SELECT filename FROM storedfiles WHERE filekey = ?", [key], (err, row) => {
          if (err) {
            return reject(err);
          }
          if (row) {
            return resolve(row.filename);
          }
          return resolve(false);
        });
      });
    },

    getCached: (hash) => {
      return new Promise((resolve, reject) => {
        db.get("SELECT filekey, filename FROM cachedfiles WHERE params_hash = ?", [hash], (err, row) => {
          if (err) {
            return reject(err);
          }
          if (row) {
            return resolve(row.filename);
          }
          return reject(false);
        });
      });
    },

    saveCached: (paramsHash, filename) => {
      return new Promise((resolve, reject) => {
        const key = uuidv4();
        const qry = "INSERT INTO cachedfiles(filekey, params_hash, filename) VALUES (?,?,?)";
        db.run(qry, [key, paramsHash, filename], (err) => {
          if (err) {
            return reject(err);
          }
          return resolve(key);
        });
      });
    },

    deleteCached(key) {
      return new Promise((resolve, reject) => {
        db.run("DELETE FROM cachedfiles WHERE filekey = ?", [key], (err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    },

    deleteFile(key) {
      return new Promise((resolve, reject) => {
        db.run("DELETE FROM storedfiles WHERE filekey = ?", [key], (err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    },

    closeConnection: () => {
      return new Promise((resolve, reject) => {
        try {
          db.close();
        } catch (err) {
          return reject(err);
        }
        return resolve(true);
      });
    }
  };
};
