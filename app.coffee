harookit =
  mode: process.env['NODE_ENV'] or 'development'

init = require './lib/init'
util = require './lib/util'

init.run(harookit, (server) ->
  server.listen(server.config['port'], ->
    util.log "Start Server", "Listening on #{server.config['port']} Press CTRL-C to stop server."
  )
)
