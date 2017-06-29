const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const codeInPre = require('../lib/code-in-pre.js').codeInPre;

describe('codeInPre', function() {
  it('Should return 5 errors regarding code in pre', function(done) {
    const str = '<pre>no code</pre>' +
      '<pre class="brush:js">no code</pre>' +
      '<pre class="brush:js"><code>some code</code></pre>' +
      '<pre class="brush:js"><code>some code</code><code>some more inline code</code></pre>' +
      '<pre class="brush:js">foo\n<code>some code</code>\nbar<br>\n<code>some code with\nline break</code>\nbaz</pre>';

    const expected = [
      {msg: '<code>some code</code>', type: ERROR},
      {msg: '<code>some code</code>', type: ERROR},
      {msg: '<code>some more inline code</code>', type: ERROR},
      {msg: '<code>some code</code>',type: ERROR},
      {msg: '<code>some code with\nline break</code>',type: ERROR}
    ];

    const expectedAfterFixing = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = codeInPre.check(rootElement);

    results.forEach((element, index) => {
      delete element.node
      assert.deepEqual(element, expected[index]);
    });

    done();
  });
});
