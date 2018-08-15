/* eslint-disable */
import { createStore, applyMiddleware, compose } from 'redux';
import modules from './modules';
import ReduxThunk from 'redux-thunk';

const config = () => {
  // **** 리덕스 개발자도구 적용
  const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  const middleware = applyMiddleware(ReduxThunk);

  const store = createStore(
    modules,
    compose(
      middleware,
      devTools
    )
  );
  return store;
};

export default config;
