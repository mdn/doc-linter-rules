const assert = require('assert');
const ERROR = require('../lib/doctests.js').ERROR;
const dataMacroNote = require('../lib/data-macro-note.js').dataMacroNote;

describe('dataMacroNote', function() {
  it('Should return 2 errors regarding Data Macros Notes', function(done) {
    const str = '<p>{{nondatamacro}}</p>' +
      '<p class="hidden">The data is maintained at <a href="https://domain/path/to/data"></a></p><p>{{compat}}</p>' +
      '<p class="hidden">The data is maintained at <a href="https://domain/path/to/data"></a></p><p>{{css_ref}}</p>' +
      '<p class="hidden">The data is maintained at <a href="https://domain/path/to/data"></a></p><p>{{cssanimatedproperties}}</p>' +
      '<p class="hidden">The data is maintained at <a href="https://domain/path/to/data"></a></p><p>{{cssinfo}}</p>' +
      '<p class="hidden">The data is maintained at <a href="https://domain/path/to/data"></a></p><p>{{csssyntax}}</p>' +
      '<p class="hidden">The data is maintained at <a href="https://domain/path/to/data"></a></p><p>{{WebExtBrowserCompat}}</p>' +
      '<p>{{Compat}}</p>' +
      '<p class="hidden">The data is maintained somewhere else.</p><p>{{Compat}}</p>';

    const expected = [
      {msg: "data_macro_note_missing", msgParams: ["{{Compat}}"], type: ERROR},
      {msg: "data_macro_source_link_missing", msgParams: ["{{Compat}}"], type: ERROR}
    ];

    let rootElement = document.createElement("body");
    rootElement.innerHTML = str;

    let results = dataMacroNote.check(rootElement);

    results.forEach((element, index) => {
      assert.deepEqual(element, expected[index]);
    });

    done();
  });
});

