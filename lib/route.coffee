express = require 'express'

util = require './util'

router = express.Router()

router.get '/', (req, res) ->
  util.log "hello", util.using.red
  res.send "say yeah"

module.exports = router