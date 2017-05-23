const path = require('path')

const NODE_ENV = process.env.NODE_ENV || 'development'

const config = {
  env: NODE_ENV,

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_public: 'public',
  dir_server: 'server',
  server_port: process.env.PORT || 3000,

  // Whether to enable verbose logging
  verbose: false,

  // ----------------------------------
  // Proxy Target
  // ----------------------------------
  proxy_target: 'https://www.baidu.com'
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
