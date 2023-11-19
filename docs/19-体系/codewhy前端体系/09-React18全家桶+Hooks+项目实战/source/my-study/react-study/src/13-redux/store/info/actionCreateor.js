import { CHANGE_INFO } from "./constants";

export const changeInfoAction = (info) => ({
  type: CHANGE_INFO,
  info
})

export const fetchChangeInfoAction = (params) => {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(changeInfoAction({ name: 'xiaohei', age: 18 }))
    }, 2000)
  }

}