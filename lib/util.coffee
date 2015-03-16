util = require 'util'

color =
  bold  : '\x1B[0;1m'
  red   : '\x1B[0;31m'
  green : '\x1B[0;32m'
  reset : '\x1B[0m'

module.exports = {
  log: (message, explanation) -> console.log color.reset + message + color.red + ' ' + (explanation or '') + color.reset
  inspect: util.inspect
}