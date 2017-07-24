const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const WARNING = require('../lib/doctests.js').WARNING;
const preWithoutClass = require('../lib/pre-without-class.js').preWithoutClass;

describe('preWithoutClass', function() {
  it('Should return 4 errors and 4 warnings regarding pre lacking a class', function(done) {
    const str = '<pre class="brush: js"></pre>' +
      '<pre class="syntaxbox"></pre>' +
      '<pre>folder/\n  file</pre>' +
      '<pre>foobar;</pre>' +
      '<pre>/* comment */\nvar code;</pre>' +
      '<pre>@rule param {\n  descriptor: value;\n}</pre>' +
      '<pre>&lt;tag&gt;</pre>' +
      '<pre id="foo"></pre>' +
      '<pre class="">foo</pre>' +
      '<pre> \n\r foo</pre>' + 
      '<div>Test on non pre</div>' +
      '<pre class="eval">bar</pre>';

    const expected = [
      {msg: '<pre>foobar;</pre>', type: WARNING},
      {msg: '<pre>/* comment */\nvar code;</pre>', type: ERROR},
      {msg: '<pre>@rule param {\n  descriptor: value;\n}</pre>', type: ERROR},
      {msg: '<pre>&lt;tag&gt;</pre>', type: ERROR},
      {msg: '<pre id="foo"></pre>', type: WARNING},
      {msg: '<pre class="">foo</pre>', type: WARNING},
      {msg: '<pre> \n\n foo</pre>', type: WARNING},
      {msg: '<pre class="eval">bar</pre>', type: ERROR}
    ];


    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = preWithoutClass.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

