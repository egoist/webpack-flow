const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = function(
  {
    hash = isProd,
    extract = isProd,
    sourceMap = true,
    loaderOptions,
    preLoader,
    fallbackLoader
  } = {}
) {
  return ({ config }) => {
    const filename = hash ? '[name].[contenthash:8].css' : '[name].css'
    config.plugin('extract-css').use(ExtractTextPlugin, [
      {
        filename,
        allChunks: true,
        disable: !extract
      }
    ])

    const ruleCSS = config.module.rule('css')
    ruleCSS.test(/\.css$/)

    const styleLoader = Object.assign(
      {
        loader: 'style-loader',
        options: {
          sourceMap
        }
      },
      fallbackLoader
    )

    let uses = [
      styleLoader,
      {
        loader: 'css-loader',
        options: Object.assign(
          {
            sourceMap,
            autoprefixer: false
          },
          loaderOptions
        )
      }
    ]

    if (preLoader) {
      uses.push(preLoader)
    }

    if (extract) {
      uses = ExtractTextPlugin.extract({
        use: uses,
        fallback: styleLoader
      })
    }

    uses.forEach(use => {
      ruleCSS.use(use.loader).loader(use.loader).options(use.options)
    })
  }
}
