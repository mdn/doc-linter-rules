# Contributing to MDN Documentation Linter rules

# How to install
The code is not yet proposed as an npm package, you need to manually clone the repository
```shell
git clone git@github.com:mdn/doc-linter-rules.git
```
Then you have to install the dependencies using npm
```shell
npm install --dev
```
Finally, you can run the tests to ensure that everything is working as expected.
```shell
npm test
```

Note: The tests are running on NightmareJS an headless Webkit based browser and on Firefox. The tests are expecting firefox to be installed.

# How to add a rule
The process to add a rule is done in three steps:
  1. Create a test for the rule in tests/ the name of the test file must be the name of the rule prepend by test- (e.g test-article-length.js).
  2. Create a linting file for the rule in lib/ (e.g article-length.js).
  3. Register those two files into karma.conf.js in the files array.


