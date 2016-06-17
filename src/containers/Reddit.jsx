import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {selectReddit, fetchPostsIfNeeded, invalidateReddit} from '../actions/reddit';
import Picker from '../components/Reddit/Picker';
import Posts from '../components/Reddit/Posts';
import styles from '../components/Reddit/Reddit.less';

class Reddit extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const {dispatch, selectedReddit} = this.props;
    dispatch(fetchPostsIfNeeded(selectedReddit));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const {dispatch, selectedReddit} = nextProps;
      dispatch(fetchPostsIfNeeded(selectedReddit));
    }
  }

  handleChange(nextReddit) {
    this.props.dispatch(selectReddit(nextReddit));
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const {dispatch, selectedReddit} = this.props;
    dispatch(invalidateReddit(selectedReddit));
    dispatch(fetchPostsIfNeeded(selectedReddit));
  }

  render() {
    const {selectedReddit, posts, isFetching, lastUpdated} = this.props;
    const isEmpty = posts.length === 0;
    return (
      <div className={styles['reddit-app']}>
        <Picker value={selectedReddit} onChange={this.handleChange} options={['reactjs', 'frontend']}/>
        <p className={styles.tips}>
          {lastUpdated && <span> Last updated at {new Date(lastUpdated).toLocaleTimeString()}. {' '} </span>}
          {!isFetching && <a href='#' onClick={this.handleRefreshClick}> Refresh </a>}
        </p>
        {isEmpty ? (isFetching ? <h5 className='text-center'>Loading...</h5> : <h5 className='text-center'>Empty.</h5>) : <div style={{ opacity: isFetching ? 0.5 : 1}}><Posts posts={posts} /></div>}
      </div>
    );
  }
}

Reddit.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {selectedReddit, postsByReddit} = state;
  const {isFetching, lastUpdated, items: posts} = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  };

  return {selectedReddit, posts, isFetching, lastUpdated};
}

export default connect(mapStateToProps)(Reddit);
