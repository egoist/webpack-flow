module.exports = function(options) {
  return ({ config }) => {
    const ruleBuble = config.module.rule('buble')
    ruleBuble.test(/\.jsx?$/)
    ruleBuble.use('buble-loader').loader('buble-loader').options(options)
  }
}
