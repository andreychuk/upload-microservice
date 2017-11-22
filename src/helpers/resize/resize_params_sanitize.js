module.exports = {

  parseDimension(paramValue, imageDimension) {
    if (paramValue <= 0) {
      return 0;
    }
    if (paramValue % 1 > 0) {
      if (paramValue < 1) {
        paramValue = Math.round(imageDimension * paramValue);
      } else {
        paramValue = Math.round(paramValue);
      }
    }
    return paramValue;
  },

  parseParams(width, height, imageWidth, imageHeight) {
    width = this.parseDimension(width, imageWidth);
    height = this.parseDimension(height, imageHeight);

    if (width && height === 0) {
      height = Math.round(imageHeight * (width / imageWidth));
    }
    if (height && width === 0) {
      width = Math.round(imageWidth * (height / imageHeight));
    }
    return {
      width,
      height
    };
  }

};
