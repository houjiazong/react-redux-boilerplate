import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class MainLayout extends Component {
  render () {
    const {children} = this.props
    return (
      <main>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/404'>Not Found</Link></li>
        </ul>
        <div>{children}</div>
      </main>
    )
  }
}

MainLayout.propTypes = {
  children: PropTypes.node
}

export default MainLayout
