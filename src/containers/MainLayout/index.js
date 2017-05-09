import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import styles from './MainLayout'

class MainLayout extends Component {
  render () {
    const {children} = this.props
    return (
      <div>
        <nav className={styles.nav}>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/404'>Not Found</Link>
        </nav>
        <div className={styles.content}>{children}</div>
      </div>
    )
  }
}

MainLayout.propTypes = {
  children: PropTypes.node
}

export default MainLayout
