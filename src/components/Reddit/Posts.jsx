import React, {PropTypes, Component} from 'react';
import styles from './Reddit.less';

export default class Posts extends Component {
  render() {
    return (
      <ul className={styles.list}>
        {this.props.posts.map((post, i) => <li key={i}><a href={post.url} target='_blank'>{post.title}</a></li>)}
      </ul>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};
