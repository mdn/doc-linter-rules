const assert = require('assert');
const anchorExists = require('../lib/anchor-exists.js').anchorExists;
const ERROR = require('../lib/doctests.js').ERROR;

describe('anchorExists', function() {
  it('Should return 1 Error regarding a link anchor without the related link', function(done) {
    const str = '<h2 id="valid">Valid anchor</h2>' +
      '<a href="#valid">Link to a valid anchor</a>' +
      '<a href="#invalid">Link to an invalid anchor</a>';

    const expected = [
      {msg: '#invalid', type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = anchorExists.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});
