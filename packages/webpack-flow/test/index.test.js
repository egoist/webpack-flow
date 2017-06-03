import path from 'path'
import flow from '../'

describe('entry', () => {
  it('append to default entryPoint', () => {
    const config = flow.createConfig([
      flow.entry('src/index.js'),
      flow.entry('src/foo.js')
    ])

    expect(config).toEqual({
      entry: {
        client: ['src/index.js', 'src/foo.js']
      }
    })
  })

  it('prepend to default entryPoint', () => {
    const config = flow.createConfig([
      flow.entry('src/index.js'),
      flow.entry.prepend('src/foo.js')
    ])

    expect(config).toEqual({
      entry: {
        client: ['src/foo.js', 'src/index.js']
      }
    })
  })

  it('append to custom entryPoint', () => {
    const config = flow.createConfig([
      flow.entry('src/index.js'),
      flow.entry('src/foo.js', 'vendor')
    ])

    expect(config).toEqual({
      entry: {
        client: ['src/index.js'],
        vendor: ['src/foo.js']
      }
    })
  })

  it('prepend to custom entryPoint', () => {
    const config = flow.createConfig([
      flow.entry('src/index.js'),
      flow.entry('src/foo.js', 'vendor'),
      flow.entry.prepend('src/bar.js', 'vendor')
    ])

    expect(config).toEqual({
      entry: {
        client: ['src/index.js'],
        vendor: ['src/bar.js', 'src/foo.js']
      }
    })
  })
})

describe('babel', () => {
  it('add babel-loader', () => {
    const config = flow.createConfig([flow.babel()])

    expect(config).toEqual({
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            use: [
              {
                loader: 'babel-loader'
              }
            ]
          }
        ]
      }
    })
  })

  it('add babel-loader with options', () => {
    const config = flow.createConfig([
      flow.babel({
        presets: ['vue-app']
      })
    ])

    expect(config).toEqual({
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['vue-app']
                }
              }
            ]
          }
        ]
      }
    })
  })
})

describe('dest', () => {
  it('set output', () => {
    const config = flow.createConfig([flow.dest('./dist/[name].js')])

    expect(config.output.path).toBe('./dist')
    expect(config.output.filename).toBe('[name].js')
    expect(config.output.publicPath).toBe('/')
    expect(config.output.pathinfo).toBe(true)
    expect(typeof config.output.devtoolModuleFilenameTemplate).toBe('function')
  })
})

describe('env', () => {
  it('no env', () => {
    const config = flow.createConfig([
      flow.env('papapa', [flow.entry('src/index.js')])
    ])

    expect(config).toEqual({})
  })

  it('by condition', () => {
    const config = flow.createConfig([
      flow.env(1 === 1, [flow.entry('src/index.js')])
    ])

    expect(config).toEqual({
      entry: {
        client: ['src/index.js']
      }
    })
  })

  it('by function return value', () => {
    const config = flow.createConfig([
      flow.env(() => false, [flow.entry('no.js')]),
      flow.env(() => true, [flow.entry('yes.js')])
    ])

    expect(config).toEqual({
      entry: {
        client: ['yes.js']
      }
    })
  })
})

describe('define constants', () => {
  it('stringified', () => {
    const config = flow.createConfig([
      flow.defineConstants({
        'process.env.NODE_ENV': 'development'
      })
    ])

    expect(config).toEqual({
      plugins: [
        {
          definitions: {
            'process.env.NODE_ENV': '"development"'
          }
        }
      ]
    })
  })
})
