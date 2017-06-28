module.exports = function(env, flows) {
  return context => {
    if (
      env === true ||
      process.env.NODE_ENV === env ||
      (typeof env === 'function' && env())
    ) {
      if (typeof flows === 'function') {
        flows = flows()
      }
      flows.forEach(flow => flow(context))
    }
  }
}
