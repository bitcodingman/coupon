/* eslint-disable */
import { createAction, handleActions } from 'redux-actions';
import { Record, List } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const GET_STAMP_INFO = 'store/GET_STAMP_INFO';

// action creators
export const getStampInfo = createAction(GET_STAMP_INFO, api.getStampInfo);

// initial state
const initialState = Record({
  stampList: {},
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
  },
  initialState
);
