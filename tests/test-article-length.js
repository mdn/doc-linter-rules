const assert = require('assert');
const INFO = require('../lib/doctests.js').INFO;
const WARNING = require('../lib/doctests.js').WARNING;
const articleLength = require('../lib/article-length.js').articleLength;

describe('articleLength', function() {
  it('Should return 1 INFO regarding article length (100 words)', function(done) {
    const str = Array(100).fill("foo").join(" ");
    const expected = [
      {msg: "article_length_info", msgParams: ["100", "< 1"], type: INFO}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = articleLength.check(rootElement);

    results.forEach((element, index) => {
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 1 INFO regarding article length (500 words)', function(done) {
    const str = Array(500).fill("foo").join(" ");
    const expected = [
      {msg: "article_length_info", msgParams: ["500", "2"], type: INFO}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = articleLength.check(rootElement);

    results.forEach((element, index) => {
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 1 INFO and 1 WARNING (3000 words)', function(done) {
    const str = Array(3000).fill("foo").join(" ");
    const expected = [
      {msg: "article_length_info", msgParams: ["3000", "11"], type: INFO},
      {msg: "long_article", type: WARNING}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = articleLength.check(rootElement);

    results.forEach((element, index) => {
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

