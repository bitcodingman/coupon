/* eslint-disable */
import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const GET_STAMP_INFO = 'store/GET_STAMP_INFO';
// const LOGOUT = 'base/LOGOUT';
// const TEMP_LOGIN = 'base/TEMP_LOGIN';
// const CHECK_LOGIN = 'base/CHECK_LOGIN';
// const CHANGE_INPUT = 'base/CHANGE_INPUT';
// const SET_USER = 'base/SET_USER';

// action creators
export const getStampInfo = createAction(GET_STAMP_INFO, api.getStampInfo);
// export const logout = createAction(LOGOUT, api.logout);
// export const checkLogin = createAction(CHECK_LOGIN, api.checkLogin);
// export const tempLogin = createAction(TEMP_LOGIN);
// export const changeInput = createAction(CHANGE_INPUT);
// export const setUser = createAction(SET_USER);

// initial state
const initialState = Map({
  stampList: List([]),
});

// reducer
export default handleActions(
  {
    ...pender({
      type: GET_STAMP_INFO,
      onSuccess: (state, action) => {
        return state.set('stampList', List(action.payload.data.data));
      },
    }),
    // ...pender({
    // 	type: CHECK_LOGIN,
    // 	onSuccess: (state, action) => {
    // 		const { logged } = action.payload.data;
    // 		return state.set('logged', logged);
    // 	},
    // }),
    // ...pender({
    // 	type: LOGOUT,
    // 	onSuccess: state => {
    // 		return initialState;
    // 	},
    // }),
    // [TEMP_LOGIN]: (state, action) => {
    // 	return state.set('logged', true);
    // },
    // [CHANGE_INPUT]: (state, action) => {
    // 	const { name, value } = action.payload;
    // 	return state.set(name, value);
    // },
    // [SET_USER]: (state, action) => {
    // 	const { userId, userType, email, name, barcode } = action.payload.data;
    // 	const newData = {
    // 		userId,
    // 		userType,
    // 		email,
    // 		name,
    // 		barcode,
    // 	};
    // 	return state
    // 		.set('email', initialState.get('email'))
    // 		.set('password', initialState.get('password'))
    // 		.set('data', newData);
    // },
  },
  initialState
);
