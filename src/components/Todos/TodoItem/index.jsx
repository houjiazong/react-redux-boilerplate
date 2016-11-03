import React, {Component, PropTypes} from 'react'
import TodoTextInput from '../TodoTextInput'
import classnames from 'classnames'
import styles from './styles.scss'

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false
    }
  }

  handleDoubleClick() {
    this.setState({ editing: true })
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo({ id, text })
    }
    this.setState({ editing: false })
  }

  render() {
    const {todo, completeTodo, deleteTodo} = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      element = (
        <div className={styles.view}>
          <input
            className={styles.toggle}
            type='checkbox'
            checked={todo.completed}
            onChange={() => completeTodo(todo.id)} />

          <label onDoubleClick={::this.handleDoubleClick}>
            {todo.text}
          </label>

          <button className={styles.destroy} onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }

    // TODO: compose
    const classes = classnames({
      [styles.completed]: todo.completed,
      [styles.editing]: this.state.editing,
      [styles.normal]: !this.state.editing
    })

    return (
      <li className={classes}>
        {element}
      </li>
    )
  }
}

TodoItem.propTypes = {
  deleteTodo: PropTypes.func,
  completeTodo: PropTypes.func,
  editTodo: PropTypes.func,
  todo: PropTypes.object
}

export default TodoItem
