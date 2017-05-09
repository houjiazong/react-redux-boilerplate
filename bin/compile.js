const fs = require('fs-extra')
const webpack = require('webpack')
const debug = require('debug')('app:bin:compile')
const webpackProdConfig = require('../config/webpack.config.prod')

const project = require('../config/project.config')

const webpackCompiler = (webpackProdConfig) => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackProdConfig)

    compiler.run((err, stats) => {
      if (err) {
        debug('==> 😭  Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()
      debug('Webpack compile completed.')
      debug(stats.toString({
        chunks: false,
        chunkModules: false,
        colors: true
      }))

      if (jsonStats.errors.length) {
        debug('==> 😭  Webpack compiler encountered errors.')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('==> 😭  Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        debug('==> 😭  Webpack compiler encountered warnings.')
        debug(jsonStats.warnings.join('\n'))
      } else {
        debug('No errors or warnings encountered.')
      }
      resolve(jsonStats)
    })
  })
}

const compile = () => {
  debug('Starting compiler.')
  return Promise.resolve()
    .then(() => webpackCompiler(webpackProdConfig))
    .then(stats => {
      if (stats.warnings.length) {
        throw new Error('Config set to fail on warning, exiting with status code "1".')
      }
      debug('Copying static assets to dist folder.')
      fs.copySync(project.paths.public(), project.paths.dist())
    })
    .then(() => {
      debug('==> 😝  Compilation completed successfully.')
    })
    .catch((err) => {
      debug('==> 😭  Compiler encountered an error.', err)
      process.exit(1)
    })
}

compile()
