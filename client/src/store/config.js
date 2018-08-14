/* eslint-disable */
import { createStore } from 'redux';
import modules from './modules';

const config = () => {
  // **** 리덕스 개발자도구 적용
  const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStore(modules, devTools);
  return store;
};

export default config;
