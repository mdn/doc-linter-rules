const assert = require('assert');
const WARNING = require('../lib/doctests.js').WARNING;
const lineLengthInPre = require('../lib/line-length-in-pre.js').lineLengthInPre;

describe('lineLengthInPre', function() {
  it('Should return 2 warning regarding too long <pre>', function(done) {
    const str =  '<pre>11111111111111111111111 11111111111111111111111 111111111111 111111111111111 1</pre>' +
      '<pre>11111111111111111111111 11111111111111111111111<br> 111111111111 111111111111111 1</pre>' +
      '<pre class="brush:js">short\nstuff</pre>' +
      '<pre class="brush:js">Code having some <a href="http://somenonexistentpage.com/path/to/script">link</a>.</pre>' +
      '<pre class="brush:js">foo\nsome code\nbar<br>\n' +
      'some code with\nline break\nbaz' +
      '11111111111 111111111111 function{ foo(); 11111111111111 bar 1111111111111111 111</pre>';

    const expected = [
      {
        msg: '11111111111111111111111 11111111111111111111111 111111111111 111111111111111 1',
        type: WARNING
      },
      {
        msg: 'baz11111111111 111111111111 function{ foo(); 11111111111111 bar 1111111111111111 111',
        type: WARNING
      }
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = lineLengthInPre.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

