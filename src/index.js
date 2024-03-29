import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import 'tachyons'

ReactDOM.render(
  <Provider store={store}>
    <App className="min-h-100"/>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
