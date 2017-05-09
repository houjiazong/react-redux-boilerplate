import React, {
  Component
} from 'react'
import styles from './NotFound'

class NotFound extends Component {
  render () {
    return (
      <section className={styles.notFound}>
        <h2>How did you end up here?</h2>
        <p>The page you're looking for doesn't exist.</p>
        <aside >
          <p>A couple of things you can try:</p>
          <ul>
            <li>Did you type in a web address to get here? Check you typed it in correctly.</li>
            <li>Try to find the page you were looking for by clicking My Account.</li>
          </ul>
        </aside>
      </section>
    )
  }
}

export default NotFound
