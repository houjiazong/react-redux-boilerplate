import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter, routerMiddleware} from 'react-router-redux'

import reducers from './reducers'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)))

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')
const render = () => {
  const NextRoot = require('./Root').default
  ReactDOM.render(
    <Provider store={store}>
      {/* ConnectedRouter will use the store from Provider automatically */}
      <ConnectedRouter history={history}>
        <NextRoot />
      </ConnectedRouter>
    </Provider>, MOUNT_NODE
  )
}

if (module.hot) {
  // Setup hot module replacement
  module.hot.accept('./Root', () =>
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    })
  )

  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default
    store.replaceReducer(nextRootReducer)
  })
}

render()
