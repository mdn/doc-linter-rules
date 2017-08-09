/*
 * Title : Test that each internal links match with an anchor
 */

const ERROR = require('./doctests.js').ERROR;

const REGEX_ID = /#(.*)/

exports.anchorExists = {
  name: 'anchor_exists',
  desc: 'anchor_exists_desc',
  check: function checkAnchorExists(rootElement) {
    let matches = [];
    let anchors = rootElement.querySelectorAll('a[href^="#"]');
    for(let anchor of anchors) {
      let id = REGEX_ID.exec(anchor.href)[0];
      let link = rootElement.querySelector(`${id}`);

      if(link === null) matches.push({msg: id, type: ERROR});
    }

    return matches;
  }
};
