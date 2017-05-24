import {
  SELECT_SUBREDDIT
} from '../actions'

const initialState = 'reactjs'

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}
