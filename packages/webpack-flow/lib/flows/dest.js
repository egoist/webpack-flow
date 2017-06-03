const path = require('path')

module.exports = function dest(outputPath, mergeOptions) {
  return ({ config }) => {
    const parsed = path.parse(outputPath)

    config.output
      .path(parsed.dir)
      .filename(parsed.base)
      .publicPath('/')
      // Point sourcemap entries to original disk location
      .devtoolModuleFilenameTemplate(info =>
        path.resolve(info.absoluteResourcePath)
      )
      // Add /* filename */ comments to generated require()s in the output.
      .pathinfo(true)

    config.output.merge(mergeOptions || {})
  }
}
