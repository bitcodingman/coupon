/* eslint-disable */
import { createAction, handleActions } from 'redux-actions';
import { Record, List } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const GET_STAMP_INFO = 'store/GET_STAMP_INFO';
const GET_ITEM_IMG = 'store/GET_ITEM_IMG';
const SHOW_ITEM_IMG = 'store/SHOW_ITEM_IMG';
const HIDE_ITEM_IMG = 'store/HIDE_ITEM_IMG';
const CHANGE_INPUT = 'store/CHANGE_INPUT';

// action creators
export const getStampInfo = createAction(GET_STAMP_INFO, api.getStampInfo);
export const getItemImg = createAction(GET_ITEM_IMG, api.getItemImg);
export const showItemImg = createAction(SHOW_ITEM_IMG);
export const hideItemImg = createAction(HIDE_ITEM_IMG);
export const changeInput = createAction(CHANGE_INPUT);

// initial state
const initialState = Record({
  stampList: List([]),
  itemImgList: List([]),
  makeStampForm: Record({
    stampTerm: '',
    stampMaximum: 10,
    couponConfig: List([]),
    itemImgView: false,
  })(),
})();

// reducer
export default handleActions(
  {
    ...pender({
      type: GET_STAMP_INFO,
      onSuccess: (state, action) => {
        return state.set('stampList', action.payload.data.data);
      },
    }),
    ...pender({
      type: GET_ITEM_IMG,
      onSuccess: (state, action) => {
        return state.set('itemImgList', action.payload.data.data);
      },
    }),
    [SHOW_ITEM_IMG]: state =>
      state.setIn(['makeStampForm', 'itemImgView'], true),
    [HIDE_ITEM_IMG]: state =>
      state.setIn(['makeStampForm', 'itemImgView'], false),
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['makeStampForm', name], value);
    },
  },
  initialState
);
