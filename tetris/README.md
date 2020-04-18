# to get both client & server coverage

first, you have to run the tests separately
then, install globaly istanbul-coverage :
```
$ npm install -g istanbul-combine
```
and execute in the root folder :
```
$ istanbul-combine -d coverage -p detail -r lcov client/coverage/coverage-final.json server/coverage/coverage-final.json
```


usage: istanbul-combine [options] patterns

where patterns is any number of file glob-patterns separated by whitespace

options:

    -d : output directory for the report(s). Defaults to coverage
    -p : what to print to the console. summary | detail | both | none. Defaults to summary.
    -r : a reporter. lcov, html, etc. You can specify multiple reporters by using this tag multiple times.
    -b : base directory resolving relative paths to absolute ones. Fixes a bug with where karma reports relative file paths.
