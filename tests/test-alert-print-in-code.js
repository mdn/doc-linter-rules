const assert = require('assert');
const alertPrintInCode = require('../lib/alert-print-in-code.js').alertPrintInCode;
const ERROR = require('../lib/doctests.js').ERROR;

describe('alertPrintInCode', function() {
  it('Should return 4 alert or print error', function(done) {
    const str = '<pre>alert("foo")</pre>' +
      '<pre class="syntaxbox">print("bar")</pre>' +
      '<pre>let someOthercode = baz; ' +
      'alert("hello world"); \n let moreCode;</pre>' +
      '<pre>document.write("foobar");</pre>';

    const expected = [
      {msg: 'alert("foo")', type: ERROR},
      {msg: 'print("bar")', type: ERROR},
      {msg: 'alert("hello world")', type: ERROR},
      {msg: 'document.write("foobar")', type: ERROR}
    ];


    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = alertPrintInCode.check(rootElement);

    results.forEach((element, index) => {
      if(element.msg != expected[index].msg || element.type != expected[index].type) 
        done(Error('Expected : ' + JSON.stringify(expected[index]) + ' got : ' + JSON.stringify(element)));
    });

    done();
  });
});

