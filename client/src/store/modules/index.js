import { combineReducers } from 'redux';
import auth from './auth';
import session from './session';

export default combineReducers({
  auth,
  session,
  // 다른 리듀서를 만들게되면 여기에 넣어줌..
});
