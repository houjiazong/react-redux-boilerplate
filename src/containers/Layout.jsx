import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

require('../static/common.less');

class Layout extends Component {
  render() {
    return (
      <div className='container'>
        <div style={{margin: '10px 0'}}>
          <span>Demo:</span>
          <Link to='reddit' className='btn btn-link'>Reddit</Link>
          <Link to='todo' className='btn btn-link'>Todo</Link>
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
