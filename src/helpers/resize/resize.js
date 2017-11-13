const gm = require('gm').subClass({ imageMagick: true });


module.exports = (filename, fullname, params) => {
  return new Promise((resolve, reject) => {
    if (Object.keys(params.query).length < 0) {
      //Validating input params

      //Checking for cached values

      //Performing resize

      //Caching

      //returning results
    }
  });
};
