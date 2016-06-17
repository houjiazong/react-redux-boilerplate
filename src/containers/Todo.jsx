import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../components/Todo/Header';
import MainSection from '../components/Todo/MainSection';
import * as TodoActions from '../actions/todo';
import styles from '../components/Todo/Todo.less';

class Todo extends Component {
  render() {
    const {todos, actions} = this.props;
    return (
      <div className={styles.todoapp}>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
      </div>
    );
  }
}

Todo.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {todos: state.todos};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
