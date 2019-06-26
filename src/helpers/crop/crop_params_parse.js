
module.exports = (query) => {
  let results = [];

  Object.keys(query).forEach((queryItem) => {
    let paramsList = [queryItem];
    if (String(queryItem).indexOf(',') !== -1) {
      paramsList = queryItem.split(',');
    }

    paramsList.forEach((paramItem) => {
      let widthParsed = /wc_(.*)/.exec(paramItem);
      if (widthParsed) {
        results.width = widthParsed[1];
      }
      let heightParsed = /hc_(.*)/.exec(paramItem);
      if (heightParsed) {
        results.height = heightParsed[1];
      }
      let cropParsed = /c_(.*)/.exec(paramItem);
      if (cropParsed) {
        results.crop = cropParsed[1];
      }
    });
  });

  return results;
};
