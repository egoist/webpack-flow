## flow.entry(filepath, [entryPoint])

Add `filepath` to an entry point, default entry point is `client`.

`flow.entry` is an alias to `flow.entry.append`.

### entryPoint

Type: `string`<br>
Default: `client`

## flow.entry.prepend(filepath, [entryPoint])

Like `flow.entry` but it inserts filepath before the first element in the entry point.

<img src="https://ooo.0o0.ooo/2017/06/03/5932770980967.gif" width="100%" />

## flow.dest(filepath, [mergeOptions])

Set Webpack's `output.path` and `output.filename` from `filepath` which is parsed by `path.parse`.

### mergeOptions

Type: `Object`<br>
Default:

```js
{
  devtoolModuleFilenameTemplate: info =>
    path.resolve(info.absoluteResourcePath),
  pathinfo: true
}
```

It will be merged into `output` option.

<img src="https://ooo.0o0.ooo/2017/06/03/5932770980967.gif" width="100%" />

## flow.babel(loaderOptions)

Add `babel-loader` for `.js`, `.jsx` files.

### loaderOptions

Type: `Object`<br>
Default: `undefined`

Options for `babel-loader`.

<img src="https://ooo.0o0.ooo/2017/06/03/5932770980967.gif" width="100%" />

## flow.defineConstants(constants)

### constants

Type: `Object`<br>
Required: `true`

Use `webpack.DefinePlugin` to replace string in your app code, the value is automatically stringified.

<img src="https://ooo.0o0.ooo/2017/06/03/5932770980967.gif" width="100%" />

## flow.env(condition, [flows])

Add flows in specific condition.

### condition

Type: `boolean`, `string`, `function`<br>
Required: `true`

- `boolean`: add flows when it's `true`.
- `string`: add flows when it's equal to `process.env.NODE_ENV`.
- `function`: add flows when its return value is trusty.

### flows

Type: `Array<flow>`<br>
Required: `true`

An array of flows.

<img src="https://ooo.0o0.ooo/2017/06/03/5932770980967.gif" width="100%" />

## flow.merge(webpackConfig)

Directly merge it into base webpack config, it's supposed to be put at the end of your flows.

### webpackConfig

Type: `Object`<br>
Required: `true`
