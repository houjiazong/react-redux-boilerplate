import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../../constants/TodoFilters';
import styles from './Todo.less';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};

class Footer extends Component {
  renderTodoCount() {
    const {activeCount} = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className={styles['todo-count']}>
        <strong>{activeCount || 'No'} </strong>
        <span>{itemWord}</span>
        <span> left</span>
      </span>
    );
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const {filter: selectedFilter, onShow} = this.props;
    const classObj = {
      [styles['selected']]: filter === selectedFilter
    };

    return (
      <a className={classnames(classObj)} style={{cursor: 'pointer'}} onClick={() => onShow(filter)}>
        {title}
      </a>
    );
  }

  renderClearButton() {
    const {completedCount, onClearCompleted} = this.props;
    if (completedCount > 0) {
      return (
        <button className={styles['clear-completed']} onClick={onClearCompleted}>
          Clear completed
        </button>
      );
    }
  }

  render() {
    return (
      <footer className={styles.footer}>
        {this.renderTodoCount()}
        <ul className={styles.filters}>
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter => <li key={filter}>
            {this.renderFilterLink(filter)}
          </li>)}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
};

export default Footer;
