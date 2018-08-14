/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from './Root';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
