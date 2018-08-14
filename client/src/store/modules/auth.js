import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

// 액션 타입 정의
const AUTH_SUCCESS = 'auth/AUTH_SUCCESS';
const AUTH_FAILURE = 'auth/AUTH_LOGOUT';

// userInfo = obj
export const authSuccess = createAction(AUTH_SUCCESS, userInfo => userInfo);

export const authFailure = createAction(AUTH_FAILURE);

// **** 초기상태 정의
const initialState = Map({
  status: {
    isLoggedIn: false,
    currentUser: '',
  },
});

// **** 리듀서 작성
// **** 리듀서 작성
export default handleActions(
  {
    [AUTH_SUCCESS]: (state, action) => {
      const NewUserStatus = Map({
        isLoggedIn: true,
        currentUser: Map(action.payload),
      });
      return state.set('status', NewUserStatus);
    },
    [AUTH_FAILURE]: state => {
      const NewUserStatus = Map({
        isLoggedIn: false,
        currentUser: {},
      });
      return state.set('status', NewUserStatus);
    },
  },
  initialState
);
