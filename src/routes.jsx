import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'

import {
  App,
  Todos
} from './containers'

export default (history) => (
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={Todos} />
      <Route path='todos' component={Todos} />
    </Route>
  </Router>
)
