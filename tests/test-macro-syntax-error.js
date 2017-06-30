const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const macroSyntaxError = require('../lib/macro-syntax-error.js').macroSyntaxError;

describe('macroSyntaxError', function() {
  it('Should return 19 errors regarding macro syntax', function(done) {
    const str = '{{macro}}' +
      '{{ macro }}' +
      '{{macro("param")}}' +
      '{{ macro("param") }}' +
      '{{macro(123)}}' +
      '{{macro(123, "param")}}' +
      '{{macro(\'param\', 123, "param")}}' +
      '{{macro("param)}}' + // Missing closing double quote
      '{{macro(\'param)}}' + // Missing closing single quote
      '{{macro(param)}}' + // Missing quotes
      '{{macro(param")}}' + // Missing opening double quote
      '{{macro(param\')}}' + // Missing opening single quote
      '{{macro(\'param\', 123, "param)}}' + // Missing closing double quote, multiple parameters
      '{{macro("param"))}}' + // Double closing parameter list bracket
      '{{macro("param")}' + // Missing closing macro curly brace after double quoted parameter
      '{{macro(\'param\')}' + // Missing closing macro curly brace after single quoted parameter
      '{{macro("param"}}' + // Missing closing parameter list bracket after double quoted parameter
      '{{macro(\'param\'}}' + // Missing closing parameter list bracket after single quoted parameter
      '{{macro(param"}}' + // Missing opening double quote and missing closing parameter list bracket
      '{{macro(param"))}}' + // Missing opening double quote and double closing parameter list bracket
      '{{macro(123, "param()"}}'; // Missing closing parameter list bracket after string parameter containing bracket

    const expected = [
      {msg: "string_parameter_incorrectly_quoted", msgParams: ['{{macro("param)}}'], type: ERROR},
      {msg: "string_parameter_incorrectly_quoted", msgParams: ["{{macro('param)}}"], type: ERROR},
      {msg: "string_parameter_incorrectly_quoted", msgParams: ["{{macro(param)}}"], type: ERROR},
      {msg: "string_parameter_incorrectly_quoted", msgParams: ['{{macro(param")}}'], type: ERROR},
      {msg: "string_parameter_incorrectly_quoted", msgParams: ["{{macro(param')}}"], type: ERROR},
      {msg: "string_parameter_incorrectly_quoted", msgParams: ["{{macro('param', 123, \"param)}}"], type: ERROR},
      {msg: "additional_closing_bracket", msgParams: ['{{macro("param"))}}'], type: ERROR},
      {msg: "missing_closing_curly_brace", msgParams: ['{{macro("param")}'], type: ERROR},
      {msg: "missing_closing_curly_brace", msgParams: ["{{macro(\'param\')}"], type: ERROR},
      {msg: "missing_closing_bracket", msgParams: ['{{macro("param"}}'], type: ERROR},
      {msg: "missing_closing_bracket", msgParams: ["{{macro(\'param\'}}"], type: ERROR},
      {msg: "missing_closing_bracket", msgParams: ['{{macro(param"}}'], type: ERROR},
      {msg: "string_parameter_incorrectly_quoted", msgParams: ['{{macro(param"}}'], type: ERROR},
      {msg: "string_parameter_incorrectly_quoted", msgParams: ['{{macro(param"))}}'], type: ERROR},
      {msg: "additional_closing_bracket", msgParams: ['{{macro(param"))}}'], type: ERROR},
      {msg: "missing_closing_bracket", msgParams: ['{{macro(123, "param()"}}'], type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = macroSyntaxError.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

