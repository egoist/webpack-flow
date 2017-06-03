/**
 * Usually you should add this flow after other flows
 */
module.exports = function(obj) {
  return ({ config }) => config.merge(obj)
}
