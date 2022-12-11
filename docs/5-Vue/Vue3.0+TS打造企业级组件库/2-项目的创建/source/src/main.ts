import { createApp, defineComponent, h, ref } from "vue"
// import App from "./App.vue"
import App from "./App"
createApp(
  // defineComponent({
  //   setup() {
  //     const numRef = ref(1)
  //     setInterval(() => {
  //       numRef.value++
  //     }, 1000)
  //     //let num = numRef.value //这样写不会更新
  //     return () => {
  //       const num = numRef.value
  //       return h("div", "haha" + num)
  //     }
  //   },
  // })
  App
).mount("#app")
