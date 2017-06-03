module.exports = function(options) {
  return ({ config }) => {
    const ruleBabel = config.module.rule('babel')
    ruleBabel.test(/\.jsx?$/)
    ruleBabel.use('babel-loader').loader('babel-loader').options(options)
  }
}
