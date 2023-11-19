import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import * as counterStore from './counter'
import * as infoStore from './info'
import thunk from 'redux-thunk'

//使用redux-devtools工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;

const reducer = combineReducers(({
  counter: counterStore.reducer,
  info: infoStore.reducer
}))


// function logger(store) {
//   let next = store.dispatch;
//   store.dispatch = function (action) {
//     console.log('当前的action:', action);
//     next(action)
//     console.log('派发之后的state', store.getState());
//   }
// }
// logger(store)

let store = createStore(reducer, applyMiddleware(thunk, logger));





function logger({ getState, dispatch }) {
  return function (next) { // next 代表下一个中间件
    return function (action) { // action动作a
      console.log('prev state', getState())
      console.log('action', action)
      next(action)
      console.log('next state', getState())
    }
  }
}



export default store
