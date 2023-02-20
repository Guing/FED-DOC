// components/m-slot/m-slot.js
// const { counter } = require("../../behaviors/counter")
import { counter } from "../../behaviors/counter"

Component({
  behaviors: [counter],
  options: {
    multipleSlots: true
  }
})
