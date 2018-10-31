var rxstr = (function(rxstr) {
  rxstr.replaceAll = require('./replaceAll')
  rxstr.format = require('./format')
  rxstr.fill = require('./fill')

  return rxstr
})({})

module.exports = rxstr
