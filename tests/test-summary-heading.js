const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const summaryHeading = require('../lib/summary-heading.js').summaryHeading;

describe('summaryHeading', function() {
  it('Should return 6 errors regarding Summary heading', function(done) {
    const str = '<h1>Summary</h1>' +
      '<h1 id="Summary" name="Summary">Summary</h1>'
      '<h2>Summary</h2>' +
      '<h2 id="Summary" name="Summary">Summary</h2>'
      '<h3>Summary</h3>' +
      '<h3 id="Summary" name="Summary">Summary</h3>' + 
      '<h4>Summary</h4>' +
      '<h4 id="Summary" name="Summary">Summary</h4>' + 
      '<h5>Summary</h5>' +
      '<h5 id="Summary" name="Summary">Summary</h5>' +
      '<h6>Summary</h6>' +
      '<h6 id="Summary" name="Summary">Summary</h6>';

    const expected = [
      {msg: '<h1>Summary</h1>', type: ERROR},
      {msg: '<h2>Summary</h2>', type: ERROR},
      {msg: '<h3>Summary</h3>', type: ERROR},
      {msg: '<h4>Summary</h4>', type: ERROR},
      {msg: '<h5>Summary</h5>', type: ERROR},
      {msg: '<h6>Summary</h6>', type: ERROR}
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

