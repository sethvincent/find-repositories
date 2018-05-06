var path = require('path')
var from = require('from2')
var each = require('each-async')
var git = require('git-state')

/**
* find all git repositories in a directory and get their status
* @param {string} rootDir - directory that repositories are in
* @param {object} [options] - options object
* @param {object} [options.fs] - alternative fs implementation. default is node's fs module
* @returns {object} repositoryStream - stream of repositories where each `data` event is a repository
**/
module.exports = function findRepositories (rootDir, options) {
  if (!options) options = {}
  var fs = options.fs || require('fs')
  var started = false

  return from.obj(function (size, next) {
    if (!started) {
      readdir(rootDir, next)
    }
  })

  function readdir (rootDir, callback) {
    started = true

    fs.lstat(rootDir, function (err, stat) {
      if (err) {
        return callback(err)
      }

      if (!stat.isDirectory()) {
        return callback(null, null)
      }

      getDirectories(rootDir, callback)
    })

    function getDirectories (rootDir, callback) {
      fs.readdir(rootDir, function (err, files) {
        if (err) {
          return callback(err)
        }

        each(files, function (file, i, next) {
          var filepath = path.join(rootDir, file)

          fs.lstat(filepath, function (err, stat) {
            if (err) {
              return callback(err)
            }

            if (!stat.isDirectory()) {
              return next()
            }

            getRepoState(filepath, { fs }, function (err, repoState, fileList) {
              if (err) {
                return callback(err)
              }

              if (!repoState) {
                return next()
              }

              callback(null, {
                root: rootDir,
                filepath: filepath,
                stat: stat,
                relname: rootDir === filepath ? path.basename(rootDir) : path.relative(rootDir, filepath),
                basename: path.basename(filepath),
                type: 'directory',
                files: fileList,
                gitState: repoState
              })

              next()
            })
          })
        }, function (err) {
          if (err) {
            return callback(err)
          }

          // end the stream
          callback(null, null)
        })
      })
    }
  }
}

function getRepoState (dir, options, callback) {
  var fs = options.fs

  git.isGit(dir, function (ok) {
    if (!ok) {
      return callback()
    }

    fs.readdir(dir, function (err, files) {
      if (err) {
        return callback(err)
      }

      files = files.map((filename) => {
        return path.join(dir, filename)
      })

      git.check(dir, function (err, result) {
        if (err) throw err
        callback(null, result, files)
      })
    })
  })
}
