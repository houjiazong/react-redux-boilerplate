import React, {
  Component
} from 'react'
import {ConnectedRouter} from 'react-router-redux'
import {
  Route,
  Link
} from 'react-router-dom'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'

import styles from './App.scss'

import Home from '../../containers/Home'
import About from '../../containers/About'
import Topics from '../../containers/Topics'

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
            <nav className={styles.nav}>
              <Link to='/'>Home</Link>
              <Link to='/about'>About</Link>
              <Link to='/topics'>Topics</Link>
            </nav>
            <div className={styles.wrap}>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
              <Route path='/topics' component={Topics} />
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
