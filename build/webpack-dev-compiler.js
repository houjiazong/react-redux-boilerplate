import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config'
import webpack from 'webpack'
import _debug from 'debug'

const debug = _debug('app:build:webpack-dev-compiler')

module.exports = (app) => {
  const compiler = webpack(webpackConfig)
  debug('start build...')
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    stats: {
      colors: true,
      hash: true,
      cached: true,
      chunkModules: false,
      cachedAssets: true
    }
  }))
  app.use(webpackHotMiddleware(compiler))
}
