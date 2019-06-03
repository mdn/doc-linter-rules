const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const largeImages = require('../lib/large-images.js').largeImages;

describe('largeImages', function() {
  it('Should return 3 Errors regarding too large images', function(done) {
    const str = '<img src="mdn-logo-sm.png" style="height:1001px; width:700px">' +
      '<img src="mdn-logo-sm.png" style="height:700px; width:1001px">' +
      '<img src="mdn-logo-sm.png" style="height:1001px; width:1001px">';

    const expected = [
      {msg: 'large_images_screen_size', msgParam: ['height: 1001', 'width: 700'], type: ERROR},
      {msg: 'large_images_screen_size', msgParam: ['height: 700', 'width: 1001'], type: ERROR},
      {msg: 'large_images_screen_size', msgParam: ['height: 1001', 'width: 1001'], type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = largeImages.check(rootElement);

    results.forEach((element, index) => {
      delete element.node
      assert.deepEqual(element, expected[index]);
    });

    done();
  });
});
