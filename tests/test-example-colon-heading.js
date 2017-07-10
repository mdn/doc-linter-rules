const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const exampleColonHeading = require('../lib/example-colon-heading.js').exampleColonHeading;

describe('exampleColonHeading', function() {
  it('Sould return 3 ERROR regarding example colon heading', function(done) {
    const str = '<h2>Example</h2>' +
      '<h3 id="Example">Example</h3>' +
      '<h3 id="Example:_Foo">Example: Foo</h3>' +
      '<h3 id="Example:_Using_Math.sin">Example: Using <code>Math.sin</code></h3>' +
      '<h2 id="Example:_Foo">Example: Foo</h2>';

    const expected = [
      {msg: '<h3 id="Example:_Foo">Example: Foo</h3>', type: ERROR},
      {msg: '<h3 id="Example:_Using_Math.sin">Example: Using <code>Math.sin</code></h3>', type: ERROR},
      {msg: '<h2 id="Example:_Foo">Example: Foo</h2>', type: ERROR}
    ];

    const expectedAfterFixing = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = exampleColonHeading.check(rootElement);
    results.forEach((element, index) => {
      delete element.node 
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

