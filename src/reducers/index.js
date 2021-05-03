import { combineReducers } from 'redux';
import commonReducer from './commonReducer';
import postReducer from './postReducer';

export default combineReducers({
  common: commonReducer,
  posts: postReducer,
});
