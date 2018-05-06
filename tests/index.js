var path = require('path')
var fs = require('fs')
var test = require('tape')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')

var findRepositories = require('../index')

test('example', function (t) {
  var dir = path.join(__dirname, 'fixtures', 'basic')
  makeExampleDirectories(dir)

  var stream = findRepositories(dir, {})
  var count = 0

  stream.on('data', function (data) {
    count++
    t.ok(data.filepath, 'filepath exists on data object')
    t.ok(data.gitState && typeof data.gitState === 'object', 'gitState exists on data object')
    t.ok(data.files && Array.isArray(data.files), 'files array exists on data object')
  })

  stream.on('end', function () {
    t.ok(count === 2)
    rimraf.sync(dir)
    t.end()
  })
})

function makeExampleDirectories (baseDir) {
  mkdirp.sync(path.join(baseDir, 'a', '.git'))
  mkdirp.sync(path.join(baseDir, 'b', '.git'))
  mkdirp.sync(path.join(baseDir, 'c'))
}
