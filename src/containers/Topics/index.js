import React, {
  Component
} from 'react'

import {
  Route,
  Link
} from 'react-router-dom'

import styles from './Topics.scss'

const New = () => (
  <div>New</div>
)

const Edit = () => (
  <div>Edit</div>
)

const List = () => (
  <div>List</div>
)

class Topics extends Component {
  render () {
    return (
      <div>
        <nav className={styles.nav}>
          <Link to='/topics/new'>New</Link>
          <Link to='/topics/edit'>Edit</Link>
          <Link to='/topics/list'>List</Link>
        </nav>
        <div className={styles.topic}>
          <Route path='/topics/new' component={New} />
          <Route path='/topics/edit' component={Edit} />
          <Route path='/topics/list' component={List} />
        </div>
      </div>
    )
  }
}

export default Topics
