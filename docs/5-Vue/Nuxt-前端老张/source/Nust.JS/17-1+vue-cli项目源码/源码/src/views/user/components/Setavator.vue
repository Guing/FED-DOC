<template>
  <div class="setavator">
    <div class="setavator-header">
      <p>设置头像</p>
      <img :src="avatar" style="opacity: 0">
    </div>
    <div class="setavator-container">
      <el-row style="margin: 10px">
        <el-col :span="2">
          <el-button
            icon="el-icon-plus"
            size="small"
            @click="changeScale(1)"
          ></el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            icon="el-icon-minus"
            size="small"
            @click="changeScale(-1)"
          ></el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            icon="el-icon-refresh-left"
            size="small"
            @click="rotateLeft()"
          ></el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            icon="el-icon-refresh-right"
            size="small"
            @click="rotateRight()"
          ></el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :style="{ height: '350px' }">
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            @realTime="realTime"
            style="
               {
                touch-action: 'none';
              }
            "
          />
        </el-col>
        <el-col :span="12" :style="{ height: '350px' }">
          <div class="avatar-upload-preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
          <div class="upload">
            <el-upload
              action="#"
              :http-request="requestUpload"
              :show-file-list="false"
              :before-upload="beforeUpload"
            >
              选择头像
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col>
          <p class="setavator-tip">
            推荐640x640像素，JPG/PNG,5M以内。头像修改后，部分页面次日生效。
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-button class="cancel" @click="cancel">取消</el-button>
        </el-col>
        <el-col :span="9">
          <el-button class="cancel" @click="uploadImg()">确认</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
import { updatePortrait, getInfo } from "@/common/api/auth";
import { mapState, mapActions } from "vuex";
import { uploadFileWithBlob, uploadFile } from "@/common/api/common";
import { updateUserInfo } from "@/common/api/user";
import { createToken } from "@/common/api/token";
import  {Loading} from 'element-ui'
export default {
  components: { VueCropper },
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      // 是否显示弹出层
      // open: true,
      // 是否显示cropper
      // visible: true,
      // 弹出层标题
      title: "修改头像",
      imgUrl: "",
      options: {
        img: this.$store.getters.avatar, //裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
      },
      previews: {},
      files: null,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    avatar() {
      if(!this.$store.getters.avatar){
        this.options.img = '/image/common/avator.png'
      }
    },
  },
  methods: {
    ...mapActions(["saveAvatorAction", "saveUserInfoAction"]),
    // 覆盖默认的上传行为
    requestUpload() {},
    // 向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    // 向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    // 上传预处理
    beforeUpload(file) {
      this.files = file;
      if (file.type.indexOf("image/") == -1) {
        this.msgError("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.options.img = reader.result;
        };
      }
    },
    // 上传图片
    uploadImg() {
      this.$refs.cropper.getCropBlob((data) => {
        //
        //
        let formData = new FormData();
        //
        //
        formData.append("file", data);
        // formData.append("id", this.userInfo.id);
        //
        var basisiloading = Loading.service({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        uploadFileWithBlob(formData).then((res) => {
          //
          this.imgUrl = res.data.url;
          createToken()
            .then((res) => {
              //
              const token = res.data.token;
              updateUserInfo({
                avatar: this.imgUrl,
                id: this.userInfo.id,
                token: res.data.token,
              }).then((res) => {
                if (res.meta.code == "200") {
                  this.$message({
                    message: "上传头像成功",
                    type: "success",
                  });
                  this.$nextTick(() => {
                    // 以服务的方式调用的 Loading 需要异步关闭
                    basisiloading.close();
                  });
                  this.getUerInfo({
                    token,
                  });
                } else {
                  this.$message({
                    message: "上传头像失败，请重新上传",
                    type: "error",
                  });
                  this.$nextTick(() => {
                    // 以服务的方式调用的 Loading 需要异步关闭
                    basisiloading.close();
                  });
                }
              });
            })
            .catch(err => {});
        });
      });
    },
    getUerInfo(params) {
      getInfo(params)
        .then((res) => {
          if (res.meta.code == "200") {
            // sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
            this.saveUserInfoAction(res.data.data);
          } else {
            this.$message({
              message: "获取用户信息失败，请联系管理员",
              type: "error",
            });
          }
          // this.saveUserInfoActions()
        })
        .catch(err => {});
    },
    // 实时预览
    realTime(data) {
      this.previews = data;
    },
    cancel() {
      this.options = {
        img:this.userInfo.avatar ? this.userInfo.avatar : '/image/common/avator.png', //裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
      };
    },
  },
};
</script>
<style scoped >
html {
  touch-action: manipulation;
}
.setavator {
  touch-action: none;
  position: relative;
}
.setavator-header {
  height: 60px;
  border-bottom: 1px solid #ccc;
}
.setavator-header p {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 60px;
  color: #333333;
}

.setavator-container {
  width: 900px;
  height: 500px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
}
.avatar-upload-preview {
  position: absolute;
  top: 10px;
  transform: translateX(50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 4px rgb(126, 120, 120);
  overflow: hidden;
}

.setavator-tip {
  width: 100%;
  height: 42px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #707070;
}

.upload {
  position: absolute;
  bottom: 0;
  left: 65%;
  width: 103px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background: rgba(0, 102, 255, 1);

  /* border: 1px solid rgba(0, 102, 255, 1); */
}
.cancel {
  width: 103px;
  height: 40px;
  text-align: center;
  color: #fff;
  background: rgba(0, 102, 255, 1);
}
.img {
  width: 200px;
  height: 20px;
  border: 1px solid red;
}
</style>
