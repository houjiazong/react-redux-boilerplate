import React, {
  PropTypes,
  Component
} from 'react'
import {Provider} from 'react-redux'
import routes from '../routes'

require('../styles/main.scss')

class Root extends Component {
  render() {
    const {store, history} = this.props
    return (
      <Provider store={store}>
        {routes(history)}
      </Provider>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default Root
