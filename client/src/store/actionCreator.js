import { bindActionCreators } from 'redux';
import * as authActions from './modules/auth';
import * as counterActions from './modules/counter';
import * as todoActions from './modules/todo';

import store from './index';

const { dispatch } = store;

// counter 액션 내보내기
export const AuthActions = bindActionCreators(authActions, dispatch);

// counter 액션 내보내기
export const CounterActions = bindActionCreators(counterActions, dispatch);

// todo 액션 내보내기
export const TodoActions = bindActionCreators(todoActions, dispatch);
