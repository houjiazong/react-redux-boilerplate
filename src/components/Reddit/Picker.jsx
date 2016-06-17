import React, {Component, PropTypes} from 'react';
import styles from './Reddit.less';

export default class Picker extends Component {
  render() {
    const {value, onChange, options} = this.props;

    return (
      <header className={styles.header}>
        <span>{value}</span>
        <select onChange={e => onChange(e.target.value)} value={value} className='form-control'>
          {options.map(option => <option value={option} key={option}>{option}</option>)}
        </select>
      </header>
    );
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
