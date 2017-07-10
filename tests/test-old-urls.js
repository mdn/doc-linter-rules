const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const oldURLs = require('../lib/old-urls.js').oldURLs;

describe('oldURLs', function() {
  it('Should return 2 errors regarding usage of old URLs format', function(done) {
    const str = '<a href=\"/en/Web\">Web</a>' +
      '<a href=\"/En/Mozilla\">Mozilla</a>';

    const expected = [
      {msg: '<a href=\"/en/Web\">Web</a>', type: ERROR},
      {msg: '<a href=\"/En/Mozilla\">Mozilla</a>', type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = oldURLs.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

