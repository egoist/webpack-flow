# Create A Flow

An example:

```js
// my-flow.js
module.exports = function myFlow(options) {
  return context => {
    // handle context and options
  }
}
```

Use your flow:

```js
// webpack.config.js
const flow = require('webpack-flow')
const myFlow = require('./my-flow')

module.exports = flow.createConfig([
  myFlow(options)
])
```

## context

### webpack

Bascially the `webpack` module.

### config

The [webpack-chain](https://github.com/mozilla-rpweb/webpack-chain) instance.
