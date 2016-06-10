import React, {Component} from 'react';
import styles from './CoreLayout.less';

class CoreLayout extends Component {
  render() {
    return (
      <div className='container'>
        <div className={styles.mainContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }
};

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout;
