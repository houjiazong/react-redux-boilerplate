import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

export default class Picker extends Component {
  render () {
    const { value, onChange, options } = this.props

    return (
      <span className={styles.title}>
        <h1>{value}</h1>
        <div className={styles.selectWrap}>
          <select
            onChange={e => onChange(e.target.value)}
            value={value}>
            {options.map(option =>
              <option value={option} key={option}>
                {option}
              </option>)
            }
          </select>
        </div>
      </span>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
