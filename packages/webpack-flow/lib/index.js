const path = require('path')
const webpack = require('webpack')
const Config = require('webpack-chain')
const builtInflows = require('./flows')

function createConfigInstance(flows) {
  const config = new Config()
  const context = Object.assign({ config, webpack }, builtInflows)
  flows.forEach(flow => flow(context))
  return config
}

function createConfig(flows) {
  return createConfigInstance(flows).toConfig()
}

module.exports = Object.assign(
  {
    createConfigInstance,
    createConfig,
    webpack
  },
  builtInflows
)
