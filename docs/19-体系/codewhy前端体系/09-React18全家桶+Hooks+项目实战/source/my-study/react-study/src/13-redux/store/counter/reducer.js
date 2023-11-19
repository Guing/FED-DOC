import { CHANGE_COUNTER } from './constants';

const defaultState = {
  counter: 10,
}



export function reducer(state = defaultState, action) {
  switch (action.type) {
    case CHANGE_COUNTER:
      return { ...state, counter: state.counter + action.counter }
    default:
      break;
  }
  return state
}

