<template>
  <img
    :src="imageSrc" :style="styleProps"
    @click.prevent="handleClick" class="l-image-component"
    :draggable="false"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { imageDefaultProps,transferToComponentProps,imageStylePropNames } from '../defaultProps'
import { useComponentCommon } from "@/hooks/useComponentCommon";
// array that contains style props
export default defineComponent({
  name: 'l-image',
  props: {
    ...transferToComponentProps(imageDefaultProps)
  },
  setup (props) {
    const { styleProps, handleClick } = useComponentCommon(
      props,
      imageStylePropNames
    );
    return {
      styleProps,
      handleClick
    }
  }
})
</script>

<style scoped>
.l-image-component {
  max-width: 100%;
}
</style>
