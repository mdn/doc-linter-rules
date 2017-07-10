// Karma configuration
// Generated on Mon Jun 19 2017 18:08:59 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
      'lib/doctests.js',
      'lib/*.js',
      'tests/test-absolute-urls-for-internal-links.js',
      'tests/test-alert-print-in-code.js',
      'tests/test-api-syntax-headlines.js',
      'tests/test-article-length.js',
      'tests/test-code-in-pre.js',
      'tests/test-data-macro-note.js',
      'tests/test-different-locale-links.js',
      'tests/test-empty-brackets.js',
      'tests/test-empty-elements.js',
      'tests/test-example-colon-heading.js',
      'tests/test-font-elements.js',
      'tests/test-html-comments.js',
      'tests/test-http-links.js',
      'tests/test-incorrectly-wrapped-sidebar-macros.js',
      'tests/test-invalid-macros.js',
      'tests/test-line-length-in-pre.js',
      'tests/test-macro-syntax-error.js',
      'tests/test-name-attribute.js',
      'tests/test-old-urls.js',
      //'tests/test-pre-without-class.js' TODO: Fix this method
      'tests/test-shell-prompts.js',
      'tests/test-span-count.js',
      'tests/test-style-attribute.js',
      'tests/test-summary-heading.js',
      'tests/test-unnecessary-macro-params.js',
      'tests/test-url-in-link-title.js',
      'tests/test-wrong-highlighted-line.js',
      'tests/test-wrong-syntax-class.js',
      'tests/test-link-count.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'lib/*.js': ['browserify'],
      'tests/*.js' : ['browserify'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'Nightmare'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
