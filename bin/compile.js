const fs = require('fs-extra')
const webpack = require('webpack')
const debug = require('debug')('app:bin:compile')
const webpackProdConfig = require('../config/webpack.config.prod')

const project = require('../config/project.config')

const runWebpackCompiler = (webpackConfig) => {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        debug('==> 😭  Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()

      if (jsonStats.errors.length > 0) {
        debug('==> 😭  Webpack compiler encountered errors.')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('==> 😭  Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        debug('==> 😭  Webpack compiler encountered warnings.')
        debug(jsonStats.warnings.join('\n'))
      } else {
        debug('==> 😝  No errors or warnings encountered.')
      }
      resolve(jsonStats)
    })
  })
}

const compile = () => Promise.resolve()
  .then(debug('Starting compiler.'))
  .then(() => debug('Target application environment: production'))
  .then(() => runWebpackCompiler(webpackProdConfig))
  .then((stats) => {
    debug('Copying static assets from ./public to ./dist.')
    fs.copySync(
      project.paths.public(),
      project.paths.dist()
    )
    return stats
  })
  .then((stats) => {
    if (project.verbose) {
      debug(stats.toString({
        colors: true,
        chunks: false
      }))
    }
    debug('==> 😝  Compiler finished successfully! See ./dist.')
  })

compile()
