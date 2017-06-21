const assert = require('assert');
const absoluteURLsForInternalLinks = require('../lib/absolute-urls-for-internal-links.js').absoluteURLsForInternalLinks;
const WARNING = require('../lib/doctests.js').WARNING;

describe('absoluteURLsForInternalLinks', function() {
  it('Should return 3 internal links warning', function(done) {
    const str = '<a href="/en-US/docs/some/page">Page</a>' +
      '<a href="#anchor">Anchor</a>' +
      '<a name="anchor">Anchor</a>' +
      '<a href="https://developer.mozilla.org/en-US/docs/some/page">Anchor</a>' +
      '<a href="http://developer.mozilla.org/en-US/docs/some/page">Anchor</a>' +
      '<a href="//developer.mozilla.org/en-US/docs/some/page">Anchor</a>';

    const expected = [
      {msg: '<a href="https://developer.mozilla.org/en-US/docs/some/page">Anchor</a>', type: WARNING},
      {msg: '<a href="http://developer.mozilla.org/en-US/docs/some/page">Anchor</a>', type: WARNING},
      {msg: '<a href="//developer.mozilla.org/en-US/docs/some/page">Anchor</a>', type: WARNING}
    ];

    const expectedAfterFixing = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = absoluteURLsForInternalLinks.check(rootElement);

    results.forEach((element, index) => {
      if(element.msg != expected[index].msg || element.type != expected[index].type) 
        done(Error('Expected : ' + JSON.stringify(expected[index]) + ' got : ' + JSON.stringify(element)));
    });

    done();
  });
});

/*const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc absoluteURLsForInternalLinks"] = function testAbsoluteURLsForInternalLinks(assert, done) {
  const tests = [
    {
      str: '<a href="/en-US/docs/some/page">Page</a>' +
           '<a href="#anchor">Anchor</a>' +
           '<a name="anchor">Anchor</a>' +
           '<a href="https://developer.mozilla.org/en-US/docs/some/page">Anchor</a>' +
           '<a href="http://developer.mozilla.org/en-US/docs/some/page">Anchor</a>' +
           '<a href="//developer.mozilla.org/en-US/docs/some/page">Anchor</a>',
      expected: [
        {
          msg: '<a href="https://developer.mozilla.org/en-US/docs/some/page">Anchor</a>',
          type: WARNING
        },
        {
          msg: '<a href="http://developer.mozilla.org/en-US/docs/some/page">Anchor</a>',
          type: WARNING
        },
        {
          msg: '<a href="//developer.mozilla.org/en-US/docs/some/page">Anchor</a>',
          type: WARNING
        }
      ],
      expectedAfterFixing: []
    }
  ];

  runTests(assert, done, "absoluteURLsForInternalLinks", "absolute URLs for internal links", url, tests);
};

require("sdk/test").run(exports);
*/
