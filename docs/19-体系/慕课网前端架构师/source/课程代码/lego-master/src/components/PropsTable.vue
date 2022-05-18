<template>
  <div class="props-table">
    <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
      <span v-if="value.text" class="label">{{ value.text }}</span>
      <component
        :is="value.component"
        :value="value.value"
        v-bind="value.extraProps"
        class="prop-component"
      >
        <template v-if="value.subComponent">
          <component
            :is="value.subComponent"
            v-for="(option, k) in value.options"
            :key="k"
            :value="option.value"
          >
            {{ option.text }}
          </component>
        </template>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import { reduce } from 'lodash-es';
  import { TextComponentProps } from '@/defaultProps';
  import { mapPropsToForms, PropsToForms } from '@/propsMap';

  export default defineComponent({
    props: {
      props: {
        type: Object as PropType<TextComponentProps>,
        required: true
      }
    },
    setup(props) {
      // 转换对象为另一种形式
      const finalProps = computed(() => {
        return reduce(
          props.props,
          (result, value, key) => {
            const newKey = key as keyof TextComponentProps;
            const item = mapPropsToForms[newKey];
            if (item) {
              item.value = item.initialTransform ? item.initialTransform(value) : value;
              result[newKey] = item;
            }
            return result;
          },
          {} as Required<PropsToForms>
        ); // result 默认值为 {}
      });
      return { finalProps };
    }
  });
</script>

<style scoped>
  .prop-item {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
  }
  .label {
    width: 28%;
  }
  .prop-component {
    width: 70%;
  }
</style>
