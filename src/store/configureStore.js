import {
  applyMiddleware,
  compose,
  createStore
}
from 'redux'
import {
  routerMiddleware
}
from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middlewares = [thunk, routerMiddleware(history)]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(reducers, initialState, compose(
    applyMiddleware(...middlewares),
    ...enhancers
  ))

  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }

  return store
}
