import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/user'


const loggerMiddleware = (store) => (next) => (action) => {
  console.log('当前的action:', action);
  const result = next(action);
  console.log('派发之后的state', store.getState());
  return result;
};
const store = configureStore({
  reducer: {
    user: userReducer.reducer
  },
  middleware: (gDM) => {

    return [...gDM(), loggerMiddleware]
  }
})
export default store