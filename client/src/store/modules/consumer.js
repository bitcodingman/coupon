/* eslint-disable */
import { createAction, handleActions } from 'redux-actions';
import { Record, List } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const GET_SAVING_STAMP_LIST = 'consumer/GET_SAVING_STAMP_LIST';
const GET_COUPON_LIST = 'consumer/GET_COUPON_LIST';
const BARCODE_VISIBILITY = 'consumer/BARCODE_VISIBILITY';

// action creators
export const getSavingStampList = createAction(
  GET_SAVING_STAMP_LIST,
  api.getSavingStampList
);
export const getCouponList = createAction(GET_COUPON_LIST, api.getCouponList);
export const barcodeVisibility = createAction(BARCODE_VISIBILITY);

// initial state
const initialState = Record({
  barcodeView: false,
  stampListNo: 0,
  stampList: List([]),
  couponListNo: 0,
  couponList: List([]),
})();

// reducer
export default handleActions(
  {
    ...pender({
      type: GET_SAVING_STAMP_LIST,
      onSuccess: (state, action) => {
        return state
          .set('stampListNo', action.payload.data.data.length)
          .set('stampList', action.payload.data.data);
      },
    }),
    ...pender({
      type: GET_COUPON_LIST,
      onSuccess: (state, action) => {
        return state
          .set('couponListNo', action.payload.data.data.length)
          .set('couponList', action.payload.data.data);
      },
    }),
    [BARCODE_VISIBILITY]: state => {
      return state.set('barcodeView', !state.barcodeView);
    },
  },
  initialState
);
