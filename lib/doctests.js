/* eslint-disable */
// Utilities for all tests

const ERROR = 1;
const WARNING = 2;
const INFO = 3;

exports.ERROR = ERROR;
exports.WARNING = WARNING;
exports.INFO = INFO;

exports.mapMatches = function mapMatches(matches, type) {
  return matches.map(match => ({msg: match, type}));
}

exports.isNewParagraphHelper = function isNewParagraphHelper(element) {
  if (!element || element.localName !== "span") {
    return false;
  }

  let style = element.getAttribute("style");
  return style && /z-index:\s*9999;/.test(style);
}
