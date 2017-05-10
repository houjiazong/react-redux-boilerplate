const path = require('path')

const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_public: 'public',
  dir_server: 'server',
  server_port: process.env.PORT || 3000,

  // ----------------------------------
  // Proxy Target
  // ----------------------------------
  proxy_target: 'https://www.baidu.com'
}

config.global = {
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production'
}

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.paths = {
  base: base,
  client: base.bind(null, config.dir_client),
  public: base.bind(null, config.dir_public),
  dist: base.bind(null, config.dir_dist)
}

module.exports = config
