import React, {
  Component
} from 'react';
import {Link} from 'react-router';

class PageNotFound extends Component {
  render() {
    return (
      <div>
        <h1>404</h1>
        <p><Link to='/'>Go to Home</Link></p>
      </div>
    );
  }
}

export default PageNotFound;
