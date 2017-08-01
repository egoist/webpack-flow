# CSS flow

## Install

```bash
yarn add style-loader css-loader @webpack-flow/css --dev
```

## Usage

```js
// webpack.config.js
const flow = require('webpack-flow')
const css = require('@webpack-flow/css')

module.exports = flow.createConfig([
  css()
])
```

## API

### css([options])

#### options

##### test

Type: [`Condition`](https://webpack.js.org/configuration/module/#condition) <br>
Default: `/\.css$/`

File matcher.

##### extract

Type: `boolean`<br>
Default: `process.env.NODE_ENV === 'production'`

Extract CSS into a single file.

##### hash

Type: `boolean`<br>
Default: `process.env.NODE_ENV === 'production'`

Add hash to filename for long-term caching, eg: `style.s2sd3fadf.css`.

##### sourceMap

Type: `boolean`<br>
Default: `true`

Enable sourceMap.

##### cssModules

Type: `boolean`<br>
Default: `undefined`

Enable CSS modules.

##### preLoader

Type: `object` `Array<object>`<br>
Default: `undefined`

Add a loader before `css-loader`, eg:

```js
css({
  preLoader: {
    loader: 'sass-loader',
    options: {}
  }
})
```
