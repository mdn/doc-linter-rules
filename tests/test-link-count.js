const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const WARNING = require('../lib//doctests.js').WARNING;
const INFO = require('../lib/doctests.js').INFO;
const linkCost = require('../lib/link-count.js').linkCount;

describe('linkCount', function() {
  it('Should return 1 error if there is more than 249 links in a page', function(done) {
    const str = Array(250).fill('<a href"#"></a>').join(' ');
    const expected = [
      {msg: "count_link_error", msgParams: [250], type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = linkCost.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 1 warning if there is more than 99 links but less than 250', function(done) {
    const str = Array(100).fill('<a href="#"></a>').join(' ');
    const expected = [
      {msg: "count_link_warning", msgParams: [100], type: WARNING}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = linkCost.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 1 info if it doesn\'t exceed any threshold', function(done) {
    const str = Array(3).fill('<a href="#"></a>').join(' ');
    const expected = [
      {msg: 'count_link_info', msgParams: [3], type: INFO}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = linkCost.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});
