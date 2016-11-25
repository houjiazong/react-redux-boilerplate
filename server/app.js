import express from 'express'
import _debug from 'debug'
import path from 'path'
import proxy from 'http-proxy-middleware'
import config from 'config'

const app = express()
const debug = _debug('app:server:main')
const IS_PROD = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 9000

if (!IS_PROD) {
  debug('Webpack Dev Compiler')
  require('../build/webpack-dev-compiler')(app)
}

app.set('view engine', 'html')
app.set('views', path.join(__dirname, '../dist'))
app.engine('html', require('ejs').renderFile)

app.use(express.static(path.join(__dirname, '/dist')))

app.get('/*', (req, res) => {
  res.render('index')
})

app.all('/api/*', proxy({
  target: config['PROXY_HOST'],
  pathRewrite: {
    '^/api': ''
  },
  changeOrigin: true
}))

app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`)
})
