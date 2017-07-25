const WARNING = require('./doctests.js').WARNING;
const ERROR = require('./doctests.js').ERROR;

const BANNED_WORDS_ERROR = [
  "he",
  "she",
  "whitelist",
  "blacklist"
];

const BANNED_WORDS_WARNING = [
  "just",
  "obvious",
  "i",
  "obviously",
  "clearly",
  "simply",
  "easily"
];

exports.languageStyle = {
  name: "language_style",
  desc: "language_style_desc",
  check: function checkLanguageStyle(rootElement) {
    let matches = [];
    let words = rootElement.textContent.split(" ");

    let bannedWarningsMatches = words.filter(x => BANNED_WORDS_WARNING.includes(x.toLowerCase()));
    bannedWarningsMatches.forEach(element => matches.push({msg: element, type: WARNING}));

    let bannedErrorsMatches = words.filter(x => BANNED_WORDS_ERROR.includes(x.toLowerCase()));
    bannedErrorsMatches.forEach(element => {
      matches.push({msg: 'language_style_banned_words', msgParams: [element], type: ERROR});
    });

    return matches;

  },
  fix: function fixLanguageStyle(matches) {
    return true;
  }
};
