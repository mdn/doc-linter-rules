const assert = require('assert');
const WARNING = require('../lib/doctests.js').WARNING;
const httpLinks = require('../lib/http-links.js').httpLinks;

describe('httpLinks', function() {
  it('Should return 1 warning regarding http links', function(done) {
    const str = '<a href=\"https://somepage.com\">some page</a>' +
           '<a href=\"ftp://somepage.com\">some page</a>' +
           '<a href=\"https://somepage.com?url=http://anotherpage.com\">some page</a>' +
      '<a href=\"http://somepage.com\">some page</a>';

    const expected = [
      {msg: '<a href="http://somepage.com">some page</a>', type: WARNING}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = httpLinks.check(rootElement);

    results.forEach((element, index) => {
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

