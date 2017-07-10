/*
 * Title : Test whether there are too many links in a page
 * This is done for SEO reasons, based on the assumption that in the case of a lot of links not all of them would be followed and indexed.
 *
 *  A Warning is emitted between 100 and 250 links
 *  An Error is emitted for more than 250 links
 *  An Info is emitted with the amount of links
 */

const WARNING = require('./doctests.js').WARNING;
const ERROR = require('./doctests.js').ERROR;
const INFO = require('./doctests.js').INFO;

exports.linkCount = {
  name: "link_count",
  desc: "link_count_desc",
  check: function checkLinkCost(rootElement) {
    let links = rootElement.getElementsByTagName("a");

    if(links.length >= 100 && links.length < 250) {
      return [{
        msg: "count_link_warning",
        msgParams: [links.length],
        type: WARNING
      }];
    }

    if(links.length >= 250) {
      return [{
        msg: "count_link_error",
        msgParams: [links.length],
        type: ERROR
      }];
    }

    return [{
      msg: "count_link_info",
      msgParams: [links.length],
      type: INFO
    }];
  },

  fix: function fixLinkCost(matches) {
    return;
  }
};
