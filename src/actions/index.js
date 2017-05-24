import axios from 'axios'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const selectSubreddit = (subreddit) => {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export const invalidateSubreddit = (subreddit) => {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export const fetchPostsIfNeeded = (subreddit) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}

export const fetchPosts = (subreddit) => (dispatch) => {
  dispatch({
    type: REQUEST_POSTS,
    subreddit
  })
  return axios({
    method: 'GET',
    url: `http://www.reddit.com/r/${subreddit}.json`
  }).then(res => {
    dispatch({
      type: RECEIVE_POSTS,
      subreddit,
      posts: res.data.data.children.map(child => child.data),
      receivedAt: Date.now()
    })
  })
}
