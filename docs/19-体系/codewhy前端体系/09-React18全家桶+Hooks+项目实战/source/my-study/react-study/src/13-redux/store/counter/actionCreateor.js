import { CHANGE_COUNTER } from "./constants";

export const changeCounterAction = (counter) => ({
  type: CHANGE_COUNTER,
  counter
})
