/*
 * Title : Prevent non https content inclusion
 *
 * Implementation notes : We check that every <img href=""> is using https://
 */

const ERROR = require('./doctests.js').ERROR;

// The string must start by https://
const HTTPS_URL = /^https:\/\//

exports.mixedContent = {
  name: "mixed_content",
  desc: "mixed_content_desc",
  check: function checkMixedContent(rootElement) {
    let images = rootElement.getElementsByTagName("img");
    let matches = [];

    for(let index = 0; index < images.length; index++){
      if(!images[index].getAttribute("src").match(HTTPS_URL)) {
        matches.push({node: images[index], msg: images[index].outerHTML, type: ERROR});
      }
    }

    return matches;
  }
};
