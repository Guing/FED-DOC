<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  {{ nameRef }}
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  reactive,
  computed,
  watchEffect,
} from "vue"

const myProps = {
  form: {
    type: Object as PropType<{ name: string; value: number }>,
  },
  age: {
    type: Number,
    required: true,
  },
} as const

export default defineComponent({
  name: "App",
  props: myProps,
  mounted() {
    this.nameRef //不用.value访问
  },
  setup(props, { slots, attrs, emit }) {
    let nameRef = ref("xiaohei")
    let personRef = reactive({ sex: 1, hair: true })
    let goRef = computed(() => {
      return nameRef.value + " go"
    })
    //当函数中的ref变化时，执行这个函数
    watchEffect(() => {
      console.log(nameRef.value)
    })
    return {
      nameRef,
      personRef,
      goRef,
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
