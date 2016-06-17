import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from './store/configureStore';

import Layout from './containers/Layout';
import Todo from './containers/Todo';
import PageNotFound from './components/PageNotFound';

const browserHistory = useRouterHistory(createBrowserHistory)({basename: '/app'});

const initialState = window.___INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const MOUNT_NODE = document.getElementById('root');
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/'>
        <Route component={Layout}>
          <Route path='todo' component={Todo} />
          <IndexRedirect to='todo' />
        </Route>
        <Route path='*' component={PageNotFound} />
      </Route>
    </Router>
  </Provider>,
  MOUNT_NODE
);
