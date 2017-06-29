const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const WARNING = require('../lib/doctests.js').WARNING;
const emptyElements = require('../lib/empty-elements.js').emptyElements;

describe('emptyElements', function() {
  it('Should return 5 errors and 1 warnings', function(done) {
    const str = '<p> </p>' +
      '<p> \n\r </p>' +
      '<p> &nbsp;</p>' +
      '<p><br><br/></p>' +
      '<p><wbr><wbr/></p>' +
      '<table><tr><td>foo</td><td><br/></td></tr></table>' +
      '<img src="http://example.com/image.png">' +
      '<p><img src="http://example.com/image.png"></p>' +
      '<input value="test"/>' +
      '<p><span>some text</span></p>' +
      '<p>some text</p>' +
      '<span><span style="display:block;z-index:9999;">&nbsp;</span></span>';

    const expected = [
      {msg: '<p> </p>', type: ERROR},
      {msg: '<p> \n\n </p>', type: ERROR},
      {msg: '<p> &nbsp;</p>', type: ERROR},
      {msg: '<p><br><br></p>',type: ERROR},
      {msg: '<p><wbr><wbr></p>',type: ERROR},
      {msg: '<td><br></td>', type: WARNING}
    ];
    const expectedAfterFixing = [
      {msg: '<td><br></td>',type: WARNING}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = emptyElements.check(rootElement);

    results.forEach((element, index) => {
      delete element.node
      assert.deepEqual(element, expected[index]);
    });

    done();
  });
});

