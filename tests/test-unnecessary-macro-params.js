const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const unnecessaryMacroParams = require('../lib/unnecessary-macro-params.js').unnecessaryMacroParams;

describe('unnecessaryMacroParams', function() {
  it('Should return 2 errors regarding unnecessary parameters in macro call', function(done) {
    const str = '{{JSRef}}' +
      '{{JSRef()}}' +
      '{{JSRef("Global_Objects")}}' +
      '{{ JSRef("Global_Objects", "Math") }}' +
      '{{csssyntax("font-family")}}';

    const expected = [
      {msg: "macro_with_unused_params", msgParams: ['{{JSRef("Global_Objects")}}'], type: ERROR},
      {msg: "macro_with_unused_params", msgParams: ['{{ JSRef("Global_Objects", "Math") }}'], type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = unnecessaryMacroParams.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

