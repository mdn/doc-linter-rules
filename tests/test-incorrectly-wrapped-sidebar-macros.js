const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const incorrectlyWrappedSidebarMacros = require('../lib/incorrectly-wrapped-sidebar-macros.js').incorrectlyWrappedSidebarMacros;

describe('incorrectlyWrappedSidebarMacros', function() {
  it('Should return 0 errors (CSSRef)', function(done) {
    const str = '<div>{{CSSRef}}</div>';
    const expected = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = incorrectlyWrappedSidebarMacros.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 0 errors (HTMLRef)', function(done) {

    const str = '<div>{{HTMLRef}}</div>';
    const expected = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = incorrectlyWrappedSidebarMacros.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 0 errors (APIRef)', function(done) {

    const str = '<div>{{APIRef}}</div>';
    const expected = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = incorrectlyWrappedSidebarMacros.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 0 errors (JSRef)', function(done) {

    const str = '<div>{{JSRef}}</div>';
    const expected = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = incorrectlyWrappedSidebarMacros.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 0 errors (SVGRefElem)', function(done) {

    const str = '<div>{{SVGRefElem}}</div>';
    const expected = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = incorrectlyWrappedSidebarMacros.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 0 errors (JSSidebar)', function(done) {

    const str = '<div>{{JSSidebar}}</div>';
    const expected = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = incorrectlyWrappedSidebarMacros.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 0 errors (AddonSidebar)', function(done) {

    const str = '<div>{{AddonSidebar}}</div>';
    const expected = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = incorrectlyWrappedSidebarMacros.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 0 errors (APIRef with parameters)', function(done) {

    const str = '<div>{{APIRef("some API")}}</div>';
    const expected = [];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = incorrectlyWrappedSidebarMacros.check(rootElement);

    results.forEach((element, index) => {
      assert.deepEqual(expected[index], element);
    });

    done();
  });

  it('Should return 1 error regarding <p> wrapping a sidebar', function(done) {

    const str = '<p>{{CSSRef}}</p>';
    const expected = [
      {msg: "wrong_element_wrapping_sidebar_macro", msgParams: ["{{CSSRef}}", "p"], type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = incorrectlyWrappedSidebarMacros.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });


  it('Should return 1 error regarding <span> wrapping a sidebar', function(done) {

    const str = '<span>{{ APIRef("Some API") }}</span>';
    const expected = [
      {msg: "wrong_element_wrapping_sidebar_macro", msgParams: ["{{ APIRef(\"Some API\") }}", "span"], type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = incorrectlyWrappedSidebarMacros.check(rootElement);

    results.forEach((element, index) => {
      delete element.node;
      assert.deepEqual(expected[index], element);
    });

    done();
  });
});

