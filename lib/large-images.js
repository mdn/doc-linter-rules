const ERROR = require('./doctests.js').ERROR;

exports.largeImages = {
  name: 'large_images',
  desc: 'large_images_desc',
  check: function checkLargeImage(rootElement) {
    let matches = [];
    let imgs = Array.from(rootElement.getElementsByTagName("img"));

    imgs.forEach(element => {
      if (element.height > 1000 || element.width > 1000) {
        matches.push({
          msg: 'large_images_screen_size',
          msgParam: [`height: ${element.height}`, `width: ${element.width}`],
          type: ERROR,
          node: element
        });
      }
    });

    return matches;
  },
  fix: function fixLargeImage(matches) {
    return true;
  }
};
