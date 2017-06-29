const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const emptyBrackets = require('../lib/empty-brackets.js').emptyBrackets;

describe('emptyBrackets', function() {
  it('Should return 2 errors regarding emptyBrackets', function(done) {
    const str = '{{ foo() }}' +
      '{{bar()}}' +
      '{{foobar("abc")}}' +
      '{{baz}}';

    const expected = [
      {msg: '{{ foo() }}', type: ERROR},
      {msg: '{{bar()}}', type: ERROR}
    ];

    const expectedAfterFixing = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = emptyBrackets.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(element, expected[index]);
    });

    done();
  });
});

