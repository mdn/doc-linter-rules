const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const nameAttribute = require('../lib/name-attribute.js').nameAttribute;

describe('nameAttribute', function() {
  it('Should return 5 errors regarding name= attribute', function(done) {
    const str = '<span name=""></span>' +
      '<div name="foo"></div>' +
      '<h2 id="foo" name="foo">foo</h2>' +
      '<h2 id="foo_bar" name="foo_bar">foo bar</h2>' +
      '<h3 name=\'baz\'>baz</h3>';

    const expected = [
      {msg: 'name=""', type: ERROR},
      {msg: 'name="foo"', type: ERROR},
      {msg: 'name="foo"', type: ERROR},
      {msg: 'name="foo_bar"', type: ERROR},
      {msg: 'name="baz"', type: ERROR}
    ];

    const expectedAfterFixing = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = nameAttribute.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

