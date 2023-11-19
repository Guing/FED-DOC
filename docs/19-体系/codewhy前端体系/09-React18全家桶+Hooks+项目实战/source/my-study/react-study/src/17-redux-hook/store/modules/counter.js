import { createSlice } from '@reduxjs/toolkit'

const infoSlice = createSlice({
  name: 'info',
  initialState: {
    counter: 0,
    message: ''
  },
  reducers: {
    addNumAction(state, action) {
      state.counter = state.counter + action.payload
    },
    cutNumAction(state, action) {
      state.counter = state.counter - action.payload
    },
    changeMessageAction(state, action) {
      state.message = action.payload
    }
  }
})
export const { addNumAction, cutNumAction, changeMessageAction } = infoSlice.actions
export default infoSlice.reducer