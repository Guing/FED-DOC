<template>
  <div class="props-table">
    <div v-for="(item, key) in finalProps" :key="key" class="prop-item">
      <p>{{ item?.text }}</p>
      <div>
        <component
          v-if="item"
          :is="item.component"
          v-bind="item.extraProps"
          :[item.valueProp]="item.value"
          v-on="item.events"
        >
          <template v-if="item.options">
            <component
              v-for="(child, index) in item.options"
              :key="index"
              :is="item.subComponent"
              v-bind="child"
            >
           
              <RenderVnode :vNode="child.text " ></RenderVnode>
            </component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, VNode } from "vue";
import { mapPropsToForms, PropsToForms } from "@/mapPropsToForm";
import { TextComponentProps } from "@/defaultProps";
import RenderVnode from "./RenderVnode";
import { reduce } from "lodash-es";
import ColorPicker from './ColorPicker.vue'
import IconSwitch from './IconSwitch.vue'
import ImageProcesser from './ImageProcesser.vue'
interface FormProps {
  component: string;
  subComponent?: string;
  value?: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string | VNode; value: any }[];
  intialTransform?: (v: any) => any;
  afterTransform?: (v: any) => any;
  valueProp: string;
  eventName?: string;
  events: { [key: string]: (e: any) => void };
}
export default defineComponent({
  props: {
    props: {
      type: Object,
      required: true,
    },
  },
  emits: ["change"],
  components: {
    RenderVnode,
    ColorPicker,
    IconSwitch,
    ImageProcesser
  },
  setup(props, context) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps;
          const item = mapPropsToForms[newKey];
          if (item) {
            const {
              valueProp = "value",
              eventName = "change",
              intialTransform,
              afterTransform,
            } = item;
            const newItem: FormProps = {
              ...item,
              value: intialTransform ? intialTransform(value) : value,
              valueProp,
              eventName,
              events: {
                [eventName]: (e: any) => {
                  context.emit("change", {
                    key,
                    value: afterTransform ? afterTransform(e) : e,
                  });
                },
              },
            };
            result[newKey] = newItem;
          }
          return result;
        },
        {} as { [key: string]: FormProps }
      );
    });
    return {
      finalProps,
    };
  },
});
</script>
<style>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.hide-item {
  display: none;
}
.label {
  width: 28%;
}
.prop-item.no-text {
  display: inline-block;
  margin: 0 10px 0 0;
}
#item-fontWeight {
  margin-left: 28%;
}
.prop-component {
  width: 70%;
}
/* .component-a-slider {
  width: 80%;
} */
.component-a-select .ant-select {
  width: 150px;
}
.prop-component.component-shadow-picker,
.prop-component.component-image-processer,
.prop-component.component-background-processer {
  width: 100%;
}
#item-backgroundImage {
  width: 100%;
  cursor: pointer;
  margin-bottom: 15px;
}
#item-backgroundImage .styled-upload-component .uploader-container {
  min-height: 200px;
}
</style>
