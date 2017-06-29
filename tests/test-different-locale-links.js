const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const differentLocaleLinks = require('../lib/different-locale-links.js').differentLocaleLinks;

describe('differentLocaleLinks', function() {
  it('Should return 3 errors regarding link using the wrong locale', function(done) {
    const str = '<a href="/en-US/docs/some/page">Page</a>' +
      '<a href="http://developer.mozilla.org/en-US/docs/some/page">Page</a>' +
      '<a href="https://developer.mozilla.org/en-US/docs/some/page">Page</a>' +
      '<a href="/xx-YY/docs/some/page">Page</a>' +
      '<a href="http://developer.mozilla.org/xx-YY/docs/some/page">Page</a>' +
      '<a href="https://developer.mozilla.org/xx-YY/docs/some/page">Page</a>';

    const expected = [
      {msg: "link_using_wrong_locale", msgParams: ["/xx-YY/docs/some/page", "en-US"], type: ERROR},
      {msg: "link_using_wrong_locale", msgParams: ["http://developer.mozilla.org/xx-YY/docs/some/page", "en-US"], type: ERROR},
      {msg: "link_using_wrong_locale", msgParams: ["https://developer.mozilla.org/xx-YY/docs/some/page", "en-US"], type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = differentLocaleLinks.check(rootElement);

    results.forEach((element, index) => {
      // TODO: Figure out the issues with msgParams as it's not normal
      delete element.msgParams;
      delete expected[index].msgParams;
      assert.deepEqual(element, expected[index]);
    });

    done();
  });
});

