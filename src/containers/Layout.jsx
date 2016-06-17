import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

require('../static/common.less');

class Layout extends Component {
  render() {
    return (
      <div className='container'>
        <div style={{margin: '10px 0'}}>
          <span>Demo:</span>
          <Link to='todo' className='btn btn-link'>Todo</Link>
          <Link to='async' className='btn btn-link'>Async</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
