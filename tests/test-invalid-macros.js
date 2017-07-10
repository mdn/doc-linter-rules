const assert = require('assert');
const WARNING = require('../lib/doctests.js').WARNING;
const ERROR = require('../lib/doctests.js').ERROR;
const invalidMacros = require('../lib/invalid-macros.js').invalidMacros;

describe('invalidMacros', function() {
  it('Should return 4 warnings and 1 error regarding invalid macros', function(done) {
    const str = '{{apiref}}' +
      '{{bug(123456)}}' +
      '{{previous("some page"}}' +
      '{{cssinfo(\'font-weight\', \'@font\')}}' +
      '{{invalidmacroname}}' +
      '{{invalidmacroname(123456)}}' +
      '{{invalidmacroname("some page")}}' +
      '{{invalidmacroname(\'font-weight\', \'@font\')}}' +
      '{{ languages( { "ja": "Ja/Browser_chrome_tests" } ) }}';

    const expected = [
      {msg: '{{invalidmacroname}}', type: WARNING},
      {msg: '{{invalidmacroname(123456)}}', type: WARNING},
      {msg: '{{invalidmacroname("some page")}}', type: WARNING},
      {msg: '{{invalidmacroname(\'font-weight\', \'@font\')}}', type: WARNING},
      {msg: 'obsolete_macro', msgParams: ['{{ languages( { "ja": "Ja/Browser_chrome_tests" } ) }}'], type: ERROR}
    ];

    const expectedAfterFixing = [
      {msg: '{{invalidmacroname}}', type: WARNING},
      {msg: '{{invalidmacroname(123456)}}', type: WARNING},
      {msg: '{{invalidmacroname("some page")}}', type: WARNING},
      {msg: '{{invalidmacroname(\'font-weight\', \'@font\')}}', type: WARNING}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = invalidMacros.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

