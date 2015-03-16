express = require 'express'
util = require './util'
config = require './config'


init = (harookit, callback) ->
  server = express()
  server.config = config(harookit.mode)

#  server.use()

  callback(server)

module.exports = {
  run: init
}