import {
  applyMiddleware,
  compose,
  createStore
}
from 'redux';
import {
  routerMiddleware
}
from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

export default (initialState = {}, history) => {
  const middlewares = [thunk, routerMiddleware(history)];

  const enhancers = [];
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const store = createStore(reducers, initialState, compose(
    applyMiddleware(...middlewares),
    ...enhancers
  ));

  store.asyncReducers = {};

  return store;
};
