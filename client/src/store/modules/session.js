import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';
import axios from 'axios';

// 액션 타입 정의
const LOADING_FINISH = 'session/LOADING_FINISH';
const SESSION_SUCCESS = 'session/SESSION_SUCCESS';
const SESSION_FAILURE = 'session/SESSION_FAILURE';

// 로그인 - 데이터 처리
export const login = (email, password, redirect) => dispatch => {
  axios({
    method: 'post',
    url: '/api/account/signin',
    data: {
      email,
      password,
    },
  })
    .then(res => {
      const { data } = res;
      if (data.is_err === true) {
        alert(data.msg);
        return dispatch({
          type: SESSION_FAILURE,
        });
      }
      const userInfo = {
        userId: data.data.user_id,
        userType: data.data.user_type,
        email: data.data.email,
        barcode: data.data.barcode,
      };
      dispatch({
        type: SESSION_SUCCESS,
        payload: userInfo,
      });
      return redirect();
    })
    .catch(error => {
      dispatch({
        type: SESSION_FAILURE,
      });
      throw error;
    });
};

// 로그아웃 - 데이터 처리
export const logout = () => dispatch => {
  axios({
    method: 'post',
    url: '/api/account/logout',
  })
    .then(res => {
      const { data } = res;
      if (data.is_err === true) {
        return alert(data.msg);
      }
      return dispatch({
        type: SESSION_FAILURE,
      });
    })
    .catch(error => {
      throw error;
    });
};

// 세션 - 데이터 처리
export const getSession = () => dispatch => {
  axios({
    method: 'get',
    url: '/api/account/getsession',
  })
    .then(res => {
      const { data } = res;
      if (data.is_err === true) {
        dispatch({
          type: SESSION_FAILURE,
        });
        return false;
      }
      const userInfo = {
        userId: data.data.userId,
        userType: data.data.userType,
        email: data.data.email,
        barcode: data.data.barcode,
      };
      return dispatch({
        type: SESSION_SUCCESS,
        payload: userInfo,
      });
    })
    .then(() => {
      dispatch({
        type: LOADING_FINISH,
      });
    })
    .catch(error => {
      dispatch({
        type: SESSION_FAILURE,
      });
      throw error;
    });
};

export const loadingFinish = createAction(LOADING_FINISH);

export const sessionSuccess = createAction(
  SESSION_SUCCESS,
  userInfo => userInfo
);

export const sessionFailure = createAction(SESSION_FAILURE);

// **** 초기상태 정의
const initialState = Record({
  loading: true,
  status: {
    isLoggedIn: false,
    currentUser: '',
  },
})();

// **** 리듀서 작성
export default handleActions(
  {
    [LOADING_FINISH]: state => state.set('loading', false),
    [SESSION_SUCCESS]: (state, action) => {
      const newUserStatus = {
        isLoggedIn: true,
        currentUser: action.payload,
      };
      return state.set('status', newUserStatus);
    },
    [SESSION_FAILURE]: state => {
      const newUserStatus = {
        isLoggedIn: false,
        currentUser: {},
      };
      return state.set('status', newUserStatus);
    },
  },
  initialState
);
