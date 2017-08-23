import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

export default class Posts extends Component {
  render () {
    return (
      <div className={styles.list}>
        {this.props.posts.map((post, i) =>
          <a key={i} className={styles.link} target='_blank' href={post.url}>
            {post.title}
          </a>
        )}
      </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
