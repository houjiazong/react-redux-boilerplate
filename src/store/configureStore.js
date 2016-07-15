import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';
import {
  routerMiddleware
}
from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

export default (initialState = {}, history) => {
  const middlewares = [thunkMiddleware, routerMiddleware(history)];
  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    ...enhancers
  ));

  store.asyncReducers = {};

  return store;
};
