const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = function(
  {
    test = /\.css$/,
    hash = isProd,
    extract = isProd,
    sourceMap = true,
    loaderOptions,
    preLoader,
    fallbackLoader,
    cssModules
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
    ruleCSS.test(test)

    const styleLoader = Object.assign(
      {
        loader: 'style-loader',
        options: {
          sourceMap
        }
      },
      fallbackLoader
    )

    const cssLoaderOptions = {
      sourceMap,
      autoprefixer: false
    }

    if (cssModules) {
      Object.assign(cssLoaderOptions, {
        modules: true,
        importLoaders: 1,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      })
    }

    Object.assign(cssLoaderOptions, loaderOptions)

    let uses = [
      styleLoader,
      {
        loader: 'css-loader',
        options: cssLoaderOptions
      }
    ]

    if (preLoader) {
      uses = uses.concat(preLoader)
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
