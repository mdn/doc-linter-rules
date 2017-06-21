const assert = require('assert');
const spanCount = require('../lib/span-count.js').spanCount;
const ERROR = require('../lib/doctests.js').ERROR;

describe('SpanCount', function() {
	it('Should return 3 span in errors', function(done) {
		const str = '<span>what?</span>' +
			'<p>nope</p>' +
			'<span class="foo" style="font:10px">bar</span>' +
			'<span><dt>foobar</dt></span>' +
			'<span class="seoSummary">seoseoseo</span>' +
			'<span><span style="display:block,z-index:9999;">&nbsp;</span></span>'; // Simulates new paragraph helper 
		const expected = [
			{msg: '<span>what?</span>', type: ERROR},
			{msg: '<span class="foo" style="font:10px">bar</span>', type: ERROR},
			{msg: '<span><dt>foobar</dt></span>', type: ERROR}
		];

		const expectedAfterFixing = [
			{msg: '<span class="foo" style="font:10px">bar</span>', type: ERROR}
		];

		let rootElement = document.createElement("body");
		rootElement.innerHTML = str;

		let results = spanCount.check(rootElement);

		results.forEach((element, index) => {
			if(element.msg != expected[index].msg || element.type != expected[index].type) done(Error('Expected : ' + JSON.stringify(expected[index]) + ' got : ' + JSON.stringify(element)));
		});

		done();
	});
});
