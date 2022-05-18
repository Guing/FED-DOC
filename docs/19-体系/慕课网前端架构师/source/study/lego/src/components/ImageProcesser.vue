<template>
  <div>
    <img class="show-img" :src="value" />
    <uploader
     
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
import { defineComponent } from "vue";
import Uploader from "./Uploader.vue";
import { message } from "ant-design-vue";
import { commonUploadCheck, UploadImgProps } from "../helper";
export default defineComponent({
  components: { Uploader },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  emits: ["change"],
  setup(props,context){
    const handleFileUploaded = (uploadedData: UploadImgProps) => {
      message.success("上传成功");
      context.emit("change", '/images/logo-simple.png');
      
    };
    return {
      handleFileUploaded,
      commonUploadCheck
    }
  }
});
</script>

<style></style>
