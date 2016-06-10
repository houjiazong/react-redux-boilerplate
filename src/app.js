import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect, IndexRoute, useRouterHistory} from 'react-router';
import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {syncHistoryWithStore} from 'react-router-redux';

import configureStore from './store/configureStore';
import {CoreLayout} from './containers';
import PageNotFound from './components/PageNotFound';
import Main from './containers/Main';

const browserHistory = useRouterHistory(createBrowserHistory)({basename: '/app'});

const initialState = window.___INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const MOUNT_NODE = document.getElementById('root');

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/'>
        <Route component={CoreLayout}>
          <Route path='main' component={Main}/>
          <IndexRedirect to='main' />
        </Route>
        <Route path='*' component={PageNotFound}/>
      </Route>
    </Router>
  </Provider>, MOUNT_NODE
);
