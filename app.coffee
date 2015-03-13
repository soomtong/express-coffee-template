path = require 'path'
express = require 'express'

util = require './lib/util'
route = require './lib/route'

app = express()

app.use(route)

app.listen 3000, ->
  util.log __dirname, util.using.green
  util.log path.dirname(__dirname), util.using.bold
  util.log "start app...", util.using.bold, "listen port from 3000"
