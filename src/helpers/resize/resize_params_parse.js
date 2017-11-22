
module.exports = (query) => {
  let results = [];

  Object.keys(query).forEach((queryItem) => {
    let paramsList = [queryItem];
    if (String(queryItem).indexOf(',') !== -1) {
      paramsList = queryItem.split(',');
    }

    paramsList.forEach((paramItem) => {
      let widthParsed = /w_(.*)/.exec(paramItem);
      if (widthParsed) {
        results.width = widthParsed[1];
      }
      let heightParsed = /h_(.*)/.exec(paramItem);
      if (heightParsed) {
        results.height = heightParsed[1];
      }
    });
  });

  return results;
};
