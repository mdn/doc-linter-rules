const assert = require('assert');
const apiSyntaxHeadlines = require('../lib/api-syntax-headlines.js').apiSyntaxHeadlines;
const ERROR = require('../lib/doctests.js').ERROR;

describe('apiSyntaxHeadlines', function() {
  it('Should return 5 apiSyntaxHeadlines errors', function(done) {
    const str = '<h2 id="Syntax">Syntax</h2>' +
      '<h3>Exceptions thrown</h3>' +
      '<h3>Returns</h3>' +
      '<h3>Arguments</h3>';

    const expected = [
      {msg: "invalid_headline_name", msgParams: ["Exception thrown"], type: ERROR},
      {msg: "invalid_headline_name", msgParams: ["Returns"], type: ERROR},
      {msg: "invalid_headline_name", msgParams: ["Arguments"], type: ERROR},
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

  it('Should return 1 Error regarding apiSyntaxHeadlines errors', function(done) {
    const str = '<h2 id="Syntax">Syntax</h2>' +
      '<h3>Return value</h3>' +
      '<h3>Errors thrown</h3>';

    const expected = [
      {msg: "invalid_headline_name", msgParams: ["Errors thrown"], type: ERROR}
    ];

    const expectedAfterFixing = [];

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

