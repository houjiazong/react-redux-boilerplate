import React, {
  Component
} from 'react'
import {BrowserRouter, StaticRouter} from 'react-router-dom'

import {isBrowser} from './utils'
import {makeRoutes} from './routes'

const Router = isBrowser ? BrowserRouter : StaticRouter

class Root extends Component {
  render () {
    return (
      <Router>{makeRoutes()}</Router>
    )
  }
}

export default Root
