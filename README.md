# webpack-flow

[![NPM version](https://img.shields.io/npm/v/webpack-flow.svg?style=flat)](https://npmjs.com/package/webpack-flow) [![NPM downloads](https://img.shields.io/npm/dm/webpack-flow.svg?style=flat)](https://npmjs.com/package/webpack-flow) [![CircleCI](https://circleci.com/gh/egoist/webpack-flow/tree/master.svg?style=shield&circle-token=e1a1a54deeacf368cc9af44162ef71bc1a255443)](https://circleci.com/gh/egoist/webpack-flow/tree/master) 
 [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## How does this work?

<details><summary>Example</summary><br>

```js
// Create Webpack Config in a composable way:
flow.createConfig([
  flow.entry('./src/index.js'),
  flow.babel(),
  flow.postcss(),
  flow.sass(),
  flow.env('production', [
    flow.output('./dist/[name].[chunkhash].js', {
      publicPath: '/my/cdn/'
    })
  ]),
  flow.env('development', [
    flow.output('dist/[name].js')
  ])
])
```
</details><br>

`webpack-flow` is similar to [webpack-blocks](https://github.com/andywer/webpack-blocks) but we're using [webpack-chain](https://github.com/mozilla-rpweb/webpack-chain) instead of [webpack-merge](https://github.com/survivejs/webpack-merge) under the hood. With `webpack-chain` you can manage deep nested webpack config in a predictable way while `webpack-merge` kind of looks like a black-box to me.

### flow.createConfig(flows)

It creates a webpack-chain instance, say `config`, and passes it through each flow to manipulate. A `flow` is a function which takes `context` (which you can use to access `config`) as argument, it could also be a higher order function if your flow needs options (most likely it does).

### flow

An example flow which defines some constants:

```diff
+ function defineConstants(constants) {
+   return context => {
+     context.config.plugin('define-constants')
+       .use(context.webpack.DefinePlugin, [stringifyObjValue(constants)])
+   }
+ }

function stringifyObjValue(obj) {
  return Object.keys(obj).reduce((res, key) => {
    res[key] = JSON.stringify(obj[key])
    return res
  }, {})
}

+ // Then use it
+ flow.createConfig([
+   defineConstants({
+     'process.env.NODE_ENV': 'development'
+   })
+ ])
```

## Install

```bash
yarn add webpack-flow
```

## Usage

```js
// webpack.config.js
const flow = require('webpack-flow')

module.exports = flow.createConfig([
  flow.entry('src/index.js'),
  //...
])
```

For more usages please head to [documentations](./docs).

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**webpack-flow** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/webpack-flow/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
