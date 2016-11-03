import React, {Component, PropTypes} from 'react'
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../../../constants/TodoFilters'
import classnames from 'classnames'
import styles from './styles.scss'

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

class Footer extends Component {
  renderTodoCount() {
    const {activeCount} = this.props
    const itemWord = activeCount === 1 ? 'item' : 'items'

    return (
      <span className={styles.count}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    )
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter]
    const {filter: selectedFilter, onShow} = this.props

    return (
      <a className={classnames({[styles.selected]: filter === selectedFilter})} style={{ cursor: 'pointer' }} onClick={() => onShow(filter)}>
        {title}
      </a>
    )
  }

  renderClearButton() {
    const {completedCount, onClearCompleted} = this.props
    if (completedCount > 0) {
      return (
        <button className={styles.clearCompleted} onClick={onClearCompleted} >
          Clear completed
        </button>
      )
    }
  }

  render() {
    return (
      <footer className={styles.normal}>
        {this.renderTodoCount()}
        <ul className={styles.filters}>
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    )
  }
}

Footer.propTypes = {
  activeCount: PropTypes.number,
  filter: PropTypes.string,
  onShow: PropTypes.func,
  completedCount: PropTypes.number,
  onClearCompleted: PropTypes.func
}

export default Footer
