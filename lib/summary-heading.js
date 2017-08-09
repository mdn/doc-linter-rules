/*
 *  Title: Test for obsolete 'Summary' heading.
 *
 *  Example 1: <h2>Summary</h2> is redundant, because the page title is shown above the article,
 *  so it should be removed.
 *
 */


const ERROR = require('./doctests.js').ERROR;

exports.summaryHeading = {
  name: "summary_heading",
  desc: "summary_heading_desc",

  check: function checkSummaryHeading(rootElement) {
    let headlines = rootElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
    let matches = [];

    if (headlines[0].textContent.match(/^\s*Summary\s*$/)) {
      matches.push({
        node: headlines[0],
        msg: headlines[0].outerHTML,
        type: ERROR
      });
    }

    return matches;
  },

  fix: function fixSummaryHeading(matches) {
    matches.forEach(match => match.node.remove());
  }
};
