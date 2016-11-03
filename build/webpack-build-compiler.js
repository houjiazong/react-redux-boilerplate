import webpack from 'webpack'
import webpackProductionConfig from './webpack.production.config.js'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'
import _debug from 'debug'
import ProgressBar from 'progress'

const debug = _debug('app:build:webpack-build-compiler')
module.exports = () => {
  const compiler = webpack(webpackProductionConfig)
  debug('start build...')
  const bar = new ProgressBar('  build [:bar] :percent :etas', {
    complete: '\u001b[42m \u001b[0m',
    incomplete: '\u001b[41m \u001b[0m',
    width: 70,
    total: 100
  })
  compiler.apply(new ProgressPlugin((percentage, msg) => {
    bar.update(percentage)
    if (bar.complete) {
      debug('Build completed')
    }
  }))
  compiler.run((err, stats) => {
    if (err) {
      debug(err)
      return
    }
    debug(stats.toString({
      chunks: false,
      colors: true
    }))
  })
}
