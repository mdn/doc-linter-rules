const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const shellPrompts = require('../lib/shell-prompts.js').shellPrompts;

describe('shellPrompts', function() {
  it('Should return 6 errors regarding shell prompts', function(done) {
    const str = '<pre>somecommand</pre>' +
      '<pre>$somecommand</pre>' +
      '<pre>$ somecommand</pre>' +
      '<pre>&gt;somecommand</pre>' +
      '<pre>&gt; somecommand</pre>' +
      '<pre>$ somecommand\noutput<br>$ anothercommand</pre>';

    const expected = [
      {msg: '$somecommand', type: ERROR},
      {msg: '$ somecommand', type: ERROR},
      {msg: '&gt;somecommand', type: ERROR},
      {msg: '&gt; somecommand', type: ERROR},
      {msg: '$ somecommand', type: ERROR},
      {msg: '$ anothercommand', type: ERROR}
    ]

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = shellPrompts.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

