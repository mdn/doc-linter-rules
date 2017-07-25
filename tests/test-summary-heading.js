const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const summaryHeading = require('../lib/summary-heading.js').summaryHeading;

describe('summaryHeading', function() {
  it('Should return 1 errors regarding Summary heading', function(done) {
    const str = '<h2>Summary</h2>' +
      '<h2 id="Summary" name="Summary">Summary</h2>' +

    const expected = [
      {msg: '<h2>Summary</h2>', type: ERROR},
    ];

    const expectedAfterFixing = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = summaryHeading.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

