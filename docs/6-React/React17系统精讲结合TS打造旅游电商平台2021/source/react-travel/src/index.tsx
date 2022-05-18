import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux'
import store from './redux/store'
import "./i18n/configs"
import axios from "axios";
import rootStore from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
axios.defaults.baseURL = 'http://localhost:8000/api/'
ReactDOM.render(
  <React.StrictMode>
     <Provider store={rootStore.store}>
       {/*使用PersistGate组件包含APP组件*/}
      <PersistGate persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

