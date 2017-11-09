const rest = require('fethers-rest');

module.exports = rest((req, res) => {
  console.log(req);
  console.log(res);
});
