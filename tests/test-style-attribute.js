const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const styleAttribute = require('../lib/style-attribute.js').styleAttribute;

describe('styleAttribute', function() {
  it('Should return 5 errors regarding style= attribute', function(done) {
    const str = '<span style=""></span>' +
           '<div style="margin-top:5%"></div>' +
           '<section style="background:#fff; color: rgb(234, 234, 234);"></section>' +
           '<b style=\'padding: 5px !important\'>test</b>' +
           '<span style="font-family: \'Open Sans\', serif; line-height: 1.5"></span>' +
      '<span><span style="display:block;z-index:9999;">&nbsp;</span></span>'; // Simulates new paragraph helper

    const expected = [
        {msg: 'style=""', type: ERROR},
        {msg: 'style="margin-top:5%"', type: ERROR},
        {msg: 'style="background:#fff; color: rgb(234, 234, 234);"', type: ERROR},
        {msg: 'style="padding: 5px !important"', type: ERROR},
        {msg: 'style="font-family: \'Open Sans\', serif; line-height: 1.5"', type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = styleAttribute.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

