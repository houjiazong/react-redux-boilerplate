import React from 'react'
import ReactDOM from 'react-dom'
import {useRouterHistory} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {syncHistoryWithStore} from 'react-router-redux'
import axios from 'axios'

import createStore from './store/createStore'

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({basename: '/'})

// ========================================================
// Store and History Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

// ========================================================
// axios interceptors
// ========================================================
axios.interceptors.request.use(config => {
  if (config.url.indexOf('http://') === -1) {
    config.url = `/api${config.url}`
  }
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json'
    }
  }
}, error => {
  Promise.reject(error)
})
axios.interceptors.response.use(res => {
  return res
}, err => {
  return Promise.reject(err)
})

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')
const render = () => {
  const NextRoot = require('./containers/Root').default
  ReactDOM.render(
    <NextRoot store={store} history={history} />,
    MOUNT_NODE
  )
}
if (module.hot) {
  // Setup hot module replacement
  module.hot.accept('./containers/Root', () =>
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    })
  )
}
// ========================================================
// Go!
// ========================================================
render()
