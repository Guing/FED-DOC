<template>
  <component
    :is="tag"
    :style="styleProps"
    @click="handleClick"
    class="l-text-component"
    >{{ text }}
  </component>
</template>

<script lang="ts">
import {
  transferToComponentProps,
  textDefaultProps,
  textStylePropNames,
} from "@/defaultProps";
import { useComponentCommon } from "@/hooks/useComponentCommon";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LText",
  props: {
    ...transferToComponentProps(textDefaultProps),
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props) {
    const { styleProps, handleClick } = useComponentCommon(
      props,
      textStylePropNames
    );
    return {
      styleProps,
      handleClick,
    };
  },
});
</script>

<style scoped lang="less">
h2.l-text-component,
p.l-text-component {
  margin-bottom: 0;
}
button.l-text-component {
  padding: 5px 10px;
  cursor: pointer;
}
.l-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important; // 暂时
}
</style>
