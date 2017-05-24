import {
  combineReducers
} from 'redux'
import {
  routerReducer as routing
} from 'react-router-redux'

import postsBySubreddit from './postsBySubreddit'
import selectedSubreddit from './selectedSubreddit'

export default combineReducers({
  postsBySubreddit,
  selectedSubreddit,
  routing
})
