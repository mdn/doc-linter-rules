/* eslint-disable */
// Utilities for all tests

export const ERROR = 1;
export const WARNING = 2;
export const INFO = 3;

export function mapMatches(matches, type) {
  return matches.map(match => ({msg: match, type}));
}

export function isNewParagraphHelper(element) {
  if (!element || element.localName !== "span") {
    return false;
  }

  let style = element.getAttribute("style");
  return style && /z-index:\s*9999;/.test(style);
}
