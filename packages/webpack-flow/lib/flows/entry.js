function entry(filepath, entryPoint) {
  entryPoint = entryPoint || 'client'
  return ({ config }) => {
    config.entry(entryPoint).add(filepath)
  }
}

entry.append = entry

entry.prepend = function(filepath, entryPoint) {
  entryPoint = entryPoint || 'client'
  return ({ config }) => {
    config.entry(entryPoint).prepend(filepath)
  }
}

module.exports = entry
