import { combineReducers } from 'redux';
import auth from './auth';
import counter from './counter';
import todo from './todo';

export default combineReducers({
  auth,
  counter,
  todo,
  // 다른 리듀서를 만들게되면 여기에 넣어줌..
});
