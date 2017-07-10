const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const fontElements = require('../lib/font-elements.js').fontElements;

describe('fontElments', function() {
  it('Should return 2 errors regarding <font>', function(done) {
    const str = '<font>Some text</font>' +
      '<font face="Open Sans, sans-serif">Another text</font>';

    const expected = [
      {msg: '<font>Some text</font>', type: ERROR},
      {msg: '<font face="Open Sans, sans-serif">Another text</font>', type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = fontElements.check(rootElement);

    results.forEach((element, index) => {
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

