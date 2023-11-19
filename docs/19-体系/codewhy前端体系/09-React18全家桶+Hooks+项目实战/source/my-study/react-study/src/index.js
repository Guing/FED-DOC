import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
// import { Provider } from 'react-redux'
// import store from './13-redux/store';
import App from './17-redux-hook/App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // <Provider store={store}>
  <App />
  // </Provider>
  // </React.StrictMode>
);


