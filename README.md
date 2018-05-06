# find-repositories

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![conduct][conduct]][conduct-url]

[npm-image]: https://img.shields.io/npm/v/find-repositories.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/find-repositories
[travis-image]: https://img.shields.io/travis/sethvincent/find-repositories.svg?style=flat-square
[travis-url]: https://travis-ci.org/sethvincent/find-repositories
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[conduct]: https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg?style=flat-square
[conduct-url]: CODE_OF_CONDUCT.md

## About

Find all the git repositories in a directory.

## Install

```sh
npm install find-repositories
```

## Usage

```js
var findRepositories = require('find-repositories')
var stream = findRepositories(dir)
stream.on('data', function (data) {})
stream.on('end', function () {})
```

Each data event looks like this:

```js
{
  /* filepath to repo */
  filepath: '/path/to/repos/example-repo',
  /* relname of repo filepath */
  relname: 'example-repo',
  /* basename of repo filepath */
  basename: 'example-repo',
  /* array of files in repo */
  files: [],
  /* object representing state of git repo provided by https://npmjs.com/git-state */
  gitState:  {
    branch: 'master',
    ahead: 0,
    dirty: 0,
    untracked: 0,
    stashes: 0
  },
  /* node stat object */
  stat: {
    // Stat object. See https://nodejs.org/api/fs.html#fs_class_fs_stats
  }
}
```

## Documentation
- [Tests](tests/)

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Conduct

It's important that this project contributes to a friendly, safe, and welcoming environment for all, particularly for folks that are historically underrepresented in technology. Read this project's [code of conduct](CONDUCT.md)

## Change log

Read about the changes to this project in [CHANGELOG.md](CHANGELOG.md). The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## License

[ISC](LICENSE.md)
