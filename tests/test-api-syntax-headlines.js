const assert = require('assert');
const apiSyntaxHeadlines = require('../lib/api-syntax-headlines.js').apiSyntaxHeadlines;
const ERROR = require('../lib/doctests.js').ERROR;

describe('apiSyntaxHeadlines', function() {
  it('Should return 4 apiSyntaxHeadlines errors', function(done) {
    const str = '<h2 id="Syntax">Syntax</h2>' +
      '<h3>Errors</h3>' +
      '<h3>Returns</h3>' +
      '<h3>Parameters</h3>';

    const expected = [
      {msg: "invalid_headline_name", msgParams: ["Errors"], type: ERROR},
      {msg: "invalid_headline_name", msgParams: ["Returns"], type: ERROR},
      {msg: "invalid_headline_order", type: ERROR},
      {msg: "invalid_headline_order", type: ERROR}
    ];

    const expectedAfterFixing = [
      {msg: "invalid_headline_order", type: ERROR},
      {msg: "invalid_headline_order", type: ERROR}
    ];

    
    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = apiSyntaxHeadlines.check(rootElement);

    results.forEach((element, index) => {
      if(element.msg != expected[index].msg || element.type != expected[index].type)
        done(Error('Expected : ' + JSON.stringify(expected[index]) + ' got : ' + JSON.stringify(element)));
    });

    done();
  });
});

/*const {ERROR, WARNING, url, runTests} = require("./testutils");

exports["test doc apiSyntaxHeadlines"] = function testSummaryHeading(assert, done) {
  const tests = [
    {
      str: '<h2 id="Syntax">Syntax</h2>' +
           '<h3>Errors</h3>' +
           '<h3>Returns</h3>' +
           '<h3>Parameters</h3>',
      expected: [
        {
          msg: "invalid_headline_name",
          msgParams: ["Errors"],
          type: ERROR
        },
        {
          msg: "invalid_headline_name",
          msgParams: ["Returns"],
          type: ERROR
        },
        {
          msg: "invalid_headline_order",
          type: ERROR
        },
        {
          msg: "invalid_headline_order",
          type: ERROR
        }
      ],
      expectedAfterFixing: [
        {
          msg: "invalid_headline_order",
          type: ERROR
        },
        {
          msg: "invalid_headline_order",
          type: ERROR
        }
      ]
    }
  ];

  runTests(assert, done, "apiSyntaxHeadlines", "API syntax headline", url, tests);
};

require("sdk/test").run(exports);
*/
