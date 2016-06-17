import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import todos from './todos';
import {
  postsByReddit,
  selectedReddit
} from './reddit';

const rootReducer = combineReducers({
  todos,
  postsByReddit,
  selectedReddit,
  routing: routerReducer
});

export default rootReducer;
