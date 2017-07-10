const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const urlInLinkTitle = require('../lib/url-in-link-title.js').urlInLinkTitle;

describe('urlInLinkTitle', function() {
  it('Should return 6 errors regarding HTTP Links', function(done) {
    const str = '<a href="http://somesite.com">Test</a>' +
           '<a href="/some/path">Test</a>' +
           '<a href="http://somesite.com" title="Valid title">Test</a>' +
           '<a href="/some/path" title="Valid title">Test</a>' +
           '<a href="http://somesite.com" title="http://somesite.com">Test</a>' +
           '<a href="http://somesite.com" title="somesite.com">Test</a>' +
           '<a href="/some/path" title="/some/path">Test</a>' +
           '<a href="/en-US/docs/some/mdn/path" title="/en/docs/some/mdn/path">Test</a>' +
           '<a href="/en-US/docs/Web" title="/en/Web">Web</a>' +
      '<a href="/en-US/docs/Mozilla" title="/En/Mozilla">Mozilla</a>';

    const expected = [
      {msg: '<a href="http://somesite.com" title="http://somesite.com">Test</a>', type: ERROR},
        {msg: '<a href="http://somesite.com" title="somesite.com">Test</a>', type: ERROR},
        {msg: '<a href="/some/path" title="/some/path">Test</a>', type: ERROR},
        {msg: '<a href="/en-US/docs/some/mdn/path" title="/en/docs/some/mdn/path">Test</a>', type: ERROR},
        {msg: '<a href="/en-US/docs/Web" title="/en/Web">Web</a>', type: ERROR},
        {msg: '<a href="/en-US/docs/Mozilla" title="/En/Mozilla">Mozilla</a>', type: ERROR}
    ];

    const expectedAfterFixing = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = urlInLinkTitle.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

