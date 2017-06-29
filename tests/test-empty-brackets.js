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


/*const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc emptyBrackets"] = function testEmptyBrackets(assert, done) {
  const tests = [
    {
      str: '{{ foo() }}' +
           '{{bar()}}' +
           '{{foobar("abc")}}' +
           '{{baz}}',
      expected: [
        {
          msg: '{{ foo() }}',
          type: ERROR
        },
        {
          msg: '{{bar()}}',
          type: ERROR
        }
      ],
      expectedAfterFixing: []
    }
  ];

  runTests(assert, done, "emptyBrackets", "empty brackets", url, tests);
};

require("sdk/test").run(exports);*/
