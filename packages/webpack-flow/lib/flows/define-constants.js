module.exports = function(constants) {
  return context => {
    context.config
      .plugin('defined-constants')
      .use(context.webpack.DefinePlugin, [stringifyObjValue(constants)])
  }
}

function stringifyObjValue(obj = {}) {
  return Object.keys(obj).reduce((res, key) => {
    res[key] = JSON.stringify(obj[key])
    return res
  }, {})
}
