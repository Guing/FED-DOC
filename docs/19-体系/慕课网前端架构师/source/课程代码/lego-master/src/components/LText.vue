<template>
  <component :is="tag" :style="styleProps" class="l-text-component" @click="handleClick">
    {{ text }}
  </component>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { transformToComponentProps, textDefaultProps, textStylePropNames } from '@/defaultProps';
  import useComponentCommon from '@/hooks/useComponentCommon';

  const defaultProps = transformToComponentProps(textDefaultProps);
  export default defineComponent({
    name: 'LText',
    props: {
      ...defaultProps,
      tag: {
        type: String,
        default: 'div'
      }
    },
    setup(props) {
      const { styleProps, handleClick } = useComponentCommon(props, textStylePropNames);
      return {
        styleProps,
        handleClick
      };
    }
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
