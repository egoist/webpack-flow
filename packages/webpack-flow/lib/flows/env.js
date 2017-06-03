module.exports = function(env, flows) {
  return context => {
    if (
      env === true ||
      process.env.NODE_ENV === env ||
      (typeof env === 'function' && env())
    ) {
      flows.forEach(flow => flow(context))
    }
  }
}
