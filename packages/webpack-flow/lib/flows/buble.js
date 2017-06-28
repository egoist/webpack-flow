module.exports = function(options) {
  return ({ config }) => {
    const ruleBuble = config.module.rule('buble')
    ruleBuble.test(/\.jsx?$/)
    ruleBuble.exclude.add(/node_modules/)
    ruleBuble.use('buble-loader').loader('buble-loader').options(options)
  }
}
