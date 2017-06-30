/*
 *  Title : Test whether the link count in a page is too heavy or not.
 *
 *  This is done for SEO reasons, the behavior is based on asumption regarding cost of links for SEO.
 *
 *  A Warning is emitted between 100 and 250 links
 *  An Error is emitted for more than 250 links
 *  An Info is emitted with the amount of links
 */

const WARNING = require('./doctests.js').WARNING;
const ERROR = require('./doctests.js').ERROR;
const INFO = require('./doctests.js').INFO;

exports.linkCost = {
  name: "link_cost",
  desc: "link_cost_desc",
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
