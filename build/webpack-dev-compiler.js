import WebpackDevServer from 'webpack-dev-server'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config'
import webpack from 'webpack'
import {PROXY_HOST} from '../config'

const compiler = webpack(webpackConfig)

const server = new WebpackDevServer(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: false,
  hot: true,
  inline: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: true,
    cached: true,
    chunkModules: false,
    cachedAssets: true
  },
  proxy: {
    '/api/*': {
      target: PROXY_HOST,
      pathRewrite: {'^/api': ''}
    }
  }
})

server.use(webpackHotMiddleware(compiler))

server.listen(9000, 'localhost')
