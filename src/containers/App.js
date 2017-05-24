import React, {
  Component
} from 'react'
import {ConnectedRouter} from 'react-router-redux'
import {
  Route
} from 'react-router-dom'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'

import Reddit from './Reddit'

class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        { /* ConnectedRouter will use the store from Provider automatically */ }
        <ConnectedRouter history={this.props.history}>
          <div style={{height: '100%'}}>
            <Route exact path='/' component={Reddit} />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
