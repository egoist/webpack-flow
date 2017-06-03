import flow from 'webpack-flow'
import css from './'

describe('css', () => {
  it('defaults', () => {
    const config = flow.createConfig([css()])

    expect(config.module.rules).toEqual([
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: {
              autoprefixer: false,
              sourceMap: true
            }
          }
        ]
      }
    ])
  })

  it('extract css', () => {
    const config = flow.createConfig([css({ extract: true })])

    expect(config.module.rules[0].use).toHaveLength(3)

    expect(config.plugins).toEqual([
      {
        filename: '[name].css',
        id: 2,
        options: { allChunks: true, disable: false }
      }
    ])
  })
})
