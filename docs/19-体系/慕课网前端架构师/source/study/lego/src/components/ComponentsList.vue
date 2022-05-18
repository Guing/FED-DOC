<template>
  <div>
    <div
      v-for="(item, index) in textList"
      :key="index"
      @click="onItemClick(item)"
    >
      <component :is="item.name" v-bind="item.props" class="inside-component" />
      <span v-if="item.text" class="tip-text">{{ item.text }}</span>
    </div>
    <uploader
      test
      action="/utils/upload-img"
      @file-uploaded="
        (uploaded) => {
          handleFileUploaded(uploaded);
        }
      "
      :beforeUpload="commonUploadCheck"
    ></uploader>
  </div>
</template>
<script lang="ts">
import { imageDefaultProps, textDefaultProps } from "@/defaultProps";
import { ComponentData } from "@/store/editor";
import { computed, defineComponent } from "vue";
import { commonUploadCheck, imageDimensions, UploadImgProps } from "../helper";
import LText from "./LText.vue";
import { v4 as uuidv4 } from "uuid";
import Uploader from "./Uploader.vue";
import { message } from "ant-design-vue";
export default defineComponent({
  components: {
    LText,
    Uploader,
  },
  emits: ["onItemClick"],
  setup(props, context) {
    const onItemClick = (data: any) => {
      context.emit("onItemClick", data);
    };
    const getTextComponentList = () => {
      const textPropsList = [
        {
          text: "大标题",
          fontSize: "30px",
          fontWeight: "bold",
          tag: "h2",
        },
        {
          text: "楷体副标题",
          fontSize: "20px",
          fontWeight: "bold",
          fontFamily: '"KaiTi","STKaiti"',
          tag: "h2",
        },
      ];
      const textList: ComponentData[] = textPropsList.map((prop) => {
        return {
          name: "l-text",
          id: uuidv4(),
          props: {
            ...textDefaultProps,
            ...(prop as any),
          },
        };
      });
      return textList;
    };
    const handleFileUploaded = (uploadedData: UploadImgProps) => {
      const data = {
        name: "l-image",
        id:uuidv4(),
        props: {
          ...imageDefaultProps,
        },
      } as ComponentData;
      message.success("上传成功");
      data.props.imageSrc = uploadedData.data.urls[0];
      imageDimensions(uploadedData.file).then((dimension) => {
        const maxWidth = 300;
        data.props.width =
          (dimension.width > maxWidth ? maxWidth : dimension.width) + "px";
        context.emit("onItemClick", data);
      });
    };
    const textList = computed(() => getTextComponentList());
    return {
      textList,
      onItemClick,
      handleFileUploaded,
      commonUploadCheck
    };
  },
});
</script>
