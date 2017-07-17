const assert = require('assert');
const mixedContent = require('../lib/mixed-content.js').mixedContent;
const ERROR = require('../lib/doctests.js').ERROR;

describe('mixedContent', function() {
  it('Should return 2 Errors regarding mixed content', function(done) {
    const str = '<img src="http://foo.bar/img.png">' +
                '<img src="https://foor.bar/img.png">' +
                '<img src="http://foo.bar/img.png?=https://">';

    const expected = [
      {msg: '<img src="http://foo.bar/img.png">', type: ERROR},
      {msg: '<img src="http://foo.bar/img.png?=https://">', type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = mixedContent.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});
