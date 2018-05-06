# find-repositories change log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

* ???

## [v1.0.0] 2018-05-06

### Added
* initial release with this usage:
  ```js
  var findRepositories = require('find-repositories')
  var stream = findRepositories(dir)
  stream.on('data', function (data) {})
  stream.on('end', function () {})
  ```

[v1.0.0]: https://github.com/sethvincent/find-repositories/tree/v1.0.0
