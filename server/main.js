const express = require('express')
const webpackDevConfig = require('../config/webpack.config.dev')
const webpack = require('webpack')
const path = require('path')
const proxy = require('http-proxy-middleware')
const debug = require('debug')('app:server')

const project = require('../config/project.config')

const app = express()

if (project.env === 'development') {
  const compiler = webpack(webpackDevConfig)

  debug('Enabling webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    contentBase: project.paths.dist(),
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    quiet: false,             // display nothing to the console
    noInfo: false,            // display no info to console (only warnings and errors)
    lazy: false,              // switch into lazy mode, that means no watching, but recompilation on every request
    stats: 'normal'
  }))

  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  app.use(express.static(project.paths.public()))

  app.use('/api', proxy({
    target: project.proxy_target,
    pathRewrite: {
      '^/api': ''
    },
    changeOrigin: true
  }))

  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  app.use(express.static(project.paths.dist()))
}

module.exports = app
