import { bindActionCreators } from 'redux';
import * as authActions from './modules/auth';
import * as sessionActions from './modules/session';

import store from './index';

const { dispatch } = store;

// AuthActions 액션 내보내기
export const AuthActions = bindActionCreators(authActions, dispatch);

// sessionActions 액션 내보내기
export const SessionActions = bindActionCreators(sessionActions, dispatch);
