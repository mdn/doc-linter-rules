const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const WARNING = require('../lib/doctests.js').WARNING;
const languageStyle = require('../lib/language-style.js').languageStyle;

describe('languageStyle', function() {
  it('Should return 4 Warnings regarding the usage of "ly" words', function(done) {
    const str = 'obviously ' +
      'clearly ' +
      'simply ' +
      'easily';

    const expected = [
      {msg: "obviously", type: WARNING},
      {msg: "clearly", type: WARNING},
      {msg: "simply", type: WARNING},
      {msg: "easily", type: WARNING}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = languageStyle.check(rootElement);

    assert.deepEqual(expected, results);

    done();
  });

  it('Should return 2 Warning regarding the usage of the word "just" and "obvious"', function(done) {
    const str = 'just obvious';

    const expected = [
      {msg: "just", type: WARNING},
      {msg: "obvious", type: WARNING}
    ];


    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = languageStyle.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 1 Warning regarding the usage of the word "I"', function(done) {
    const str = 'I am an MDN Web Docs user';

    const expected = [
      {msg: "I", type: WARNING}
    ];


    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = languageStyle.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 5 Errors regarding wrong capitalization in technology name', function(done) {
    const str = 'javascript ' + 'JavaScript ' +
      'ecmascript ' + 'ECMAScript ' +
      'html ' + 'HTML ' +
      'firefox ' + 'Firefox ' +
      'Spidermonkey ' + 'SpiderMonkey ';

    const expected = [
      {msg: 'javascript', type: ERROR},
      {msg: 'ecmascript', type: ERROR},
      {msg: 'html', type: ERROR},
      {msg: 'firefox', type: ERROR},
      {msg: 'Spidermonkey', type: ERROR}
    ];


    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = languageStyle.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 4 errors regarding blacklisted word usage', function(done) {
    const str = 'he is beautiful ' +
      'He is beautiful ' +
      'she is beautiful ' +
      'She is beautiful ' +
      'This is a whitelist ' +
      'This is Whitelist ' +
      'This is a blacklist ' +
      'This is a Blacklist ' +
      'This is a BlackList too ';

    const expected = [
      {msg: 'language_style_banned_words', msgParams: ["he"], type: ERROR},
      {msg: 'language_style_banned_words', msgParams: ["He"], type: ERROR},
      {msg: 'language_style_banned_words', msgParams: ["she"], type: ERROR},
      {msg: 'language_style_banned_words', msgParams: ["She"], type: ERROR},
      {msg: 'language_style_banned_words', msgParams: ["whitelist"], type: ERROR},
      {msg: 'language_style_banned_words', msgParams: ["Whitelist"], type: ERROR},
      {msg: 'language_style_banned_words', msgParams: ["blacklist"], type: ERROR},
      {msg: 'language_style_banned_words', msgParams: ["Blacklist"], type: ERROR},
      {msg: 'language_style_banned_words', msgParams: ["BlackList"], type: ERROR}
    ];


    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = languageStyle.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});
