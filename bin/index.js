#! /usr/bin/env node

var minimist = require('minimist')
var repositories = require('../index')

var argv = minimist(process.argv.slice(2))

findRepositories(process.cwd(), argv).on('data', console.log)
