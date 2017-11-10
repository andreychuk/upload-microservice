module.exports = {
  parseJSON(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return false;
    }
  },
  isJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
};
