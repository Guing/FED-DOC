<template>
  <div>
    <div @click="onActive(id)" :class="{ active: active }">
      <span @click="onDel(id)">X</span>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["onActive", "onDel"],
  props: {
    id: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const onActive = (id: string) => {
      context.emit("onActive", id);
    };
    const onDel = (id: string) => {
      context.emit("onDel", id);
    };
    return {
      onActive,
      onDel,
    };
  },
});
</script>
<style>
.active {
  border: 1px solid red;
}
</style>
