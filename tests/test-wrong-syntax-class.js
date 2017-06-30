const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const wrongSyntaxClass = require('../lib/wrong-syntax-class.js').wrongSyntaxClass;

describe('wrongSyntaxClass', function() {
  it('Should return 0 errors regarding wrong syntax in class= (syntaxbox)', function(done) {
    const str = 'foo<h2>Syntax</h2>\\n<pre class=\"syntaxbox\">syntax</pre>bar';
    const expected = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = wrongSyntaxClass.check(rootElement);
    
    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 0 errors regarding class brushjs', function(done) {
    const str = 'foo<h2>Syntax</h2>\\n<pre class=\"brush:css\">syntax examples</pre>bar<h3>Formal syntax</h3>\\n<pre class=\"syntaxbox\">syntax</pre>';
    const expected = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = wrongSyntaxClass.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 1 error regarding eval', function(done) {
    const str = 'foo<h2>Syntax</h2>\\n<pre class=\"brush:css\">syntax examples</pre>bar<h3>Formal syntax</h3>\\n<pre class=\"eval\">syntax</pre>baz<h2>Other section</h2>';
    const expected = [
        {msg: "wrong_syntax_class_used", msgParams: ["eval"], type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = wrongSyntaxClass.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

