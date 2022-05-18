import { createStore, applyMiddleware } from "redux";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productDetailSlice } from "./productDetail/slice";
import { productSearchSlice } from "./productSearch/slice";
import { shoppingCartSlice } from "./shoppingCart/slice";
import { userSlice } from "./user/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//使用@reduxjs/toolkit的combineReducers，替换redux的combineReducers
//使用combineReducers支持toolkit创建的reducer


//设置persist配置
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
}


const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  productSearch:productSearchSlice.reducer,
  user: userSlice.reducer,
  shoppingCart:shoppingCartSlice.reducer
});

//创建基于rootReducer的persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
  //替换原有的rootReducer为persistedReducer
  reducer: persistedReducer,
 
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],

  devTools:true 
});

export type RootState = ReturnType<typeof store.getState>;

//创建基于persist的Store
const persistor = persistStore(store)

export default { store, persistor };
