import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTokenAction = createAsyncThunk('user/fetchToken', async (params, { dispatch, getState }) => {
  const token = await new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove('123456')
    }, 2000)
  })
  dispatch(changeToken(params + 'abc'))
  return token;
})

const userReducer = createSlice({
  name: 'user',
  initialState: {
    username: 'xiaohei',
    age: 18,
    token: ''
  },
  reducers: {
    changeUsername(state, action) {
      state.username = action.payload
    },
    changeAge(state, action) {
      state.age = action.payload
    },
    changeToken(state, action) {
      state.token = action.payload
    }
  },
  extraReducers: {
    // [fetchTokenAction.fulfilled](state, action) {
    //   state.token = action.payload
    // },
    // [fetchTokenAction.pending]() {
    //   console.log('loadding');
    // },
    // [fetchTokenAction.rejected]() {
    //   console.log('reject');
    // }
  }
})

export default userReducer
export const { changeUsername, changeAge, changeToken } = userReducer.actions
export const { reducer } = userReducer