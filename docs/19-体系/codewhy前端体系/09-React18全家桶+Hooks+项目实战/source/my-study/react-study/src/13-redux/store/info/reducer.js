import { CHANGE_INFO } from './constants';

const defaultState = {
  info: {}
}



export function reducer(state = defaultState, action) {
  switch (action.type) {

    case CHANGE_INFO:
      return { ...state, info: action.info }
    default:
      break;
  }
  return state
}

