const debug = require('debug')('app:bin:start')

const project = require('../config/project.config')

debug('Starting server...')
require('../server/main').listen(3000, () => {
  debug(`==> 🌎  Server is now running at http://localhost:${project.server_port}.`)
})
