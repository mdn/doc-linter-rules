const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const htmlComments = require('../lib/html-comments.js').htmlComments;

describe('htmlComments', function() {
  it('Should return 3 errors regarding HTML comments tag', function(done) {
    const str = '<!-- {cke_protected}{C}%3C!--%20--%3E -->' +
           '<!-- {cke_protected}{C}%3C!--%20%3Cspan%3Efoo%3C%2Fspan%3E%20--%3E -->' +
      '<!-- {cke_protected}{C}%3C!--%20hello%20%5Cn%20world%20--%3E -->';

    const expected = [
      {msg: '<!-- -->', type: ERROR},
      {msg: '<!-- <span>foo</span> -->', type: ERROR},
      {msg: '<!-- hello \\n world -->', type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = htmlComments.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

