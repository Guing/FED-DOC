import { configureStore } from '@reduxjs/toolkit'
import infoSlice from './modules/counter'

export default configureStore({
  reducer: {
    info: infoSlice
  }
})
