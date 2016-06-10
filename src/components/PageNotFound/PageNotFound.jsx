import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './PageNotFound.less';

class PageNotFound extends Component {
  render() {
    return (
      <div className={styles.PNF}>
        <h1>Page Not Found.</h1>
        <p>Go to <Link to='/'>Home Page</Link></p>
      </div>
    );
  }
}

export default PageNotFound;
