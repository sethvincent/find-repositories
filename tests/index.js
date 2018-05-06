var path = require('path')
var test = require('tape')

var findRepositories = require('../index')

test('example', function (t) {
  var dir = path.join(__dirname, 'fixtures', 'basic')
  var stream = findRepositories(dir, {})
  var count = 0

  stream.on('data', function (data) {
    count++
    console.log(data)
    t.ok(data.filepath, 'filepath exists on data object')
    t.ok(data.gitState && typeof data.gitState === 'object', 'gitState exists on data object')
    t.ok(data.files && Array.isArray(data.files), 'files array exists on data object')
  })

  stream.on('end', function () {
    t.ok(count === 2)
    t.end()
  })
})
