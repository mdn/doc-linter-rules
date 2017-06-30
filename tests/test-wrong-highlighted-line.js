const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const wrongHighlightedLine = require('../lib/wrong-highlighted-line.js').wrongHighlightedLine;

describe('wrongHighlightedLine', function() {
  it('Should return 10 errors related to wrong highlighted line', function(done) {
    const str = '<pre class="brush: js; highlight[2];">foo\nbar</pre>' +
           '<pre class="brush:js;">foo\nbar</pre>' +
           '<pre class="highlight[1]; brush:js;">foo\nbar</pre>' +
           '<pre class="brush: js; highlight[1,3];">foo\nbar\nbaz</pre>' +
           '<pre class="brush: js; highlight[1-3];">foo\nbar\nbaz</pre>' +
           '<pre class="brush: js; highlight[1-3,5];">foo\nbar\nbaz\nbax\nbix</pre>' +
           '<pre class="brush: js; highlight[ 1, 3 - 5 ,2 ];">foo\nbar\nbaz\nbax\nbix</pre>' +
           '<pre class="brush: js; highlight[0];">foo\nbar</pre>' +
           '<pre class="brush: js; highlight[-1];">foo\nbar</pre>' +
           '<pre class="brush: js; highlight[3];">foo\nbar</pre>' +
           '<pre class="brush: js; highlight[3];">foo<br>bar</pre>' +
           '<pre class="brush: js; highlight[3];">foo<br/>bar</pre>' +
           '<pre class="brush: js; highlight:[3];">foo<br>bar</pre>' +
           '<pre class="brush: js; highlight[1,-3--5,3];">foo\nbar\nbaz</pre>' +
      '<pre class="brush: js; highlight [ 1, 3 - 6 ,2 ];">foo\nbar\nbaz</pre>';

    const expected = [
        {msg: "highlighted_line_number_not_positive", msgParams: ["0", "0"], type: ERROR},
        {msg: "highlighted_line_number_not_positive", msgParams: ["-1", "-1"], type: ERROR},
        {msg: "highlighted_line_number_too_big", msgParams: ["3", "2", "3"], type: ERROR},
        {msg: "highlighted_line_number_too_big", msgParams: ["3", "2", "3"], type: ERROR},
        {msg: "highlighted_line_number_too_big", msgParams: ["3", "2", "3"], type: ERROR},
        {msg: "highlighted_line_number_too_big", msgParams: ["3", "2", "3"], type: ERROR},
        {msg: "highlighted_line_number_not_positive", msgParams: ["-3", "1,-3--5,3"], type: ERROR},
        {msg: "highlighted_line_number_not_positive", msgParams: ["-5", "1,-3--5,3"], type: ERROR},
        {msg: "invalid_highlighted_range", msgParams: ["-3", "-5", "1,-3--5,3"], type: ERROR},
        {msg: "highlighted_line_number_too_big", msgParams: ["6", "3", " 1, 3 - 6 ,2 "], type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = wrongHighlightedLine.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

