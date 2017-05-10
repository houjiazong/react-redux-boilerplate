import React, {
  Component
} from 'react'
import {BrowserRouter, StaticRouter} from 'react-router-dom'
import axios from 'axios'

import {isBrowser} from './utils'
import {makeRoutes} from './routes'

const Router = isBrowser ? BrowserRouter : StaticRouter

class Root extends Component {
  componentDidMount () {
    axios({
      method: 'GET',
      url: '/api/s',
      params: {
        wd: 'baidu'
      }
    }).then(res => {
      console.log(res)
    })
  }
  render () {
    return (
      <Router>{makeRoutes()}</Router>
    )
  }
}

export default Root
