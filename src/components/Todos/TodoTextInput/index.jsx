import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import styles from './styles.scss'

class TodoTextInput extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || ''
    }
  }

  handleSubmit(e) {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleBlur(e) {
    const text = e.target.value.trim()
    if (!this.props.newTodo) {
      this.props.onSave(text)
    }
  }

  render() {
    const classes = classnames({
      [styles.edit]: this.props.editing,
      [styles.new]: this.props.newTodo
    }, styles.normal)

    return (
      <input
        className={classes}
        type='text'
        autoFocus='true'
        placeholder={this.props.placeholder}
        value={this.state.text}
        onBlur={::this.handleBlur}
        onChange={::this.handleChange}
        onKeyDown={::this.handleSubmit} />
    )
  }
}

TodoTextInput.propTypes = {
  placeholder: PropTypes.string,
  onSave: PropTypes.func,
  newTodo: PropTypes.bool,
  editing: PropTypes.string,
  text: PropTypes.string
}

export default TodoTextInput
