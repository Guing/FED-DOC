<template>
  <div class="setprofile">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="profile-tabs">
      <el-tab-pane label="基本信息" name="first" class="profile-pane">
        <div class="changeInfo" @click="showBasisBtn">修改<i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
        <el-form
          ref="basisForm"
          :model="basisForm"
          label-width="100px"
          style="width: 500px"
        >
          <el-form-item label="姓名" prop="realName">
            <el-input
              v-model="basisForm.realName"
              :disabled="isDis"
              placeholder="无"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input
              v-model="basisForm.nickName"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="certificateType">
            <el-select
              v-model="basisForm.certificateType"
              placeholder="无"
              :disabled="isDis"
            >
              <el-option label="身份证" value="1"></el-option>
              <el-option label="居住证" value="2"></el-option>
              <el-option label="签证" value="3"></el-option>
              <el-option label="护照" value="4"></el-option>
              <el-option label="户口本" value="5"></el-option>
              <el-option label="军人证" value="6"></el-option>
              <el-option label="港澳通行证" value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="certificateNumber">
            <el-input
              v-model="basisForm.certificateNumber"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="basisForm.gender" :disabled="isDis">
              <el-radio label="1">男生</el-radio>
              <el-radio label="2">女生</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="最高学历" prop="highestEducation">
            <el-select
              v-model="basisForm.highestEducation"
              placeholder="无"
              :disabled="isDis"
            >
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="博士" value="博士"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="大专" value="大专"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="中专" value="中专"></el-option>
              <el-option label="初中" value="初中"></el-option>
              <el-option label="小学" value="小学"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input
              v-model="basisForm.age"
              placeholder="无"
              :disabled="isDis"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="basisForm.birthday"
              type="date"
              placeholder="无"
              :disabled="isDis"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="户口所在地" prop="residenceAddress">
            <el-input
              v-model="basisForm.residenceAddress"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="签名" prop="personalSignature">
            <el-input
              v-model="basisForm.personalSignature"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item v-show="basisOpen">
            <el-row>
              <el-col :span="12"><el-button @click="cancel">取消</el-button></el-col>
              <el-col :span="12"><el-button type="primary" @click="basisSubmit">确认</el-button></el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="联系信息" name="second" class="profile-pane">
        <div class="changeInfo" @click="showInfoBtn">修改<i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          style="width: 500px"
        >
          <el-form-item label="手机号" prop="mobile">
            <el-input
              v-model="form.mobile"
              placeholder="无"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="座机号" prop="officeTelephone">
            <el-input
              v-model="form.telephone"
              placeholder="无"
              :disabled="isInfo"
            ></el-input>
          </el-form-item>
          <el-form-item label="办公电话" prop="officeTelephone">
            <el-input
              v-model="form.officeTelephone"
              placeholder="无"
              :disabled="isInfo"
            ></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人" prop="emergencyContact">
            <el-input
              v-model="form.emergencyContact"
              placeholder="无"
              :disabled="isInfo"
            ></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人电话" prop="emergencyContactNumber">
            <el-input
              v-model="form.emergencyContactNumber"
              placeholder="无"
              :disabled="isInfo"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="form.email"
              placeholder="无"
              :disabled="isInfo"
            ></el-input>
          </el-form-item>
          <el-form-item label="微信" prop="wechat">
            <el-input
              v-model="form.wechat"
              placeholder="无"
              :disabled="isInfo"
            ></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="qq">
            <el-input
              v-model="form.qq"
              placeholder="无"
              :disabled="isInfo"
            ></el-input>
          </el-form-item>
          <el-form-item label="所在城市" prop="city" :disabled="true">
            <el-input
              v-model="form.city"
              :disabled="isInfo"
              placeholder="无"
            ></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address" :disabled="true">
            <el-input
              v-model="form.address"
              placeholder="无"
              :disabled="isInfo"
            ></el-input>
          </el-form-item>
          <el-form-item v-show="formOpen">
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button @click="Formcancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getInfo } from "@/common/api/auth";
import { createToken } from "@/common/api/token";
import { updateUserInfo } from "@/common/api/user";
import  {Loading} from 'element-ui'
export default {
  data() {
    return {
      activeName: "first",
      basisForm:{},
      form: {},
      isDis: true,
      isInfo:true,
      basisOpen:false,
      formOpen:false,
      rules: {
        certificateNumber: [
          { required: true, message: '请输入数字', trigger: 'blur' },
          { pattern: /^\d$/, message: '只能输入数字' }
        ]
      }

    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  created() {
    this.basisForm = this.userInfo;
    this.form = this.userInfo;
    // this.getList()
  },
  methods: {
    ...mapActions(["saveUserInfoAction"]),
    getList() {
      createToken().then((mes) => {
        // var tokens = mes.data.token
        if (mes.meta.code == "200") {
          getInfo({
            token: mes.data.token,
          }).then((mess) => {
            //
            // this.form = ress.data.data
            // sessionStorage.setItem("userInfo", JSON.stringify(mess.data.data));
            this.saveUserInfoAction(mess.data.data);
          });
        }
      });
    },
    handleClick() {},
    basisSubmit(){
      //遍历所有的form表单 过滤特殊字符
      for (var item in this.basisForm) {
        if (item !== "avatar" && item !== 'birthday' && this.basisForm[item]) {
          this.basisForm[item] = this.filterStr(this.basisForm[item]);
        }
      }
      // 时间格式化
      if(this.basisForm.birthday) {
        this.basisForm.birthday = this.dateFormat(this.basisForm.birthday, 'yyyy-MM-dd')
      }
      // 添加id
      this.basisForm.id = this.userInfo.id
      var basisiloading = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      //
      createToken().then((res) => {
        //
        if (res.meta.code === "200") {
          updateUserInfo({
            token: res.data.token,
            ...this.basisForm
          }).then((ress) => {
            if (ress.meta.code === "200") {
              this.getList();
              this.isDis = true;
              this.$message({
                message: "更新信息成功",
                type: "success",
              });
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                basisiloading.close();
              });
            }else {
              this.$message({
                message: "更新信息失败",
                type: "error",
              });
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                basisiloading.close();
              });
            }
          });
        }
      });

       },
    onSubmit() {
      //遍历所有的form表单 过滤特殊字符
      for (var item in this.form) {
        if (item !== "avatar" && this.form[item]) {
          this.form[item] = this.filterStr(this.form[item]);
        }
      }
      var subloading = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      createToken().then((res) => {
        //
        if (res.meta.code === "200") {
          updateUserInfo({
            token: res.data.token,
            ...this.form
          }).then((ress) => {
            if (ress.meta.code === "200") {
              this.getList();
              this.isInfo = true;
              this.formOpen = false;
              this.$message({
                message: "更新信息成功",
                type: "success",
              });
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                subloading.close();
              });
            }else {
              this.$message({
                message: "更新信息失败",
                type: "error",
              });
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                subloading.close();
              });
            }
          });
        }
      });
      //
    },
    // 验证特殊字符
    filterStr(str) {
      var pattern = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]"
      );
      var specialStr = "";
      for (var i = 0; i < str.length; i++) {
        specialStr += str.substr(i, 1).replace(pattern, "");
      }
      return specialStr;
    },
    showBasisBtn(){
      this.isDis = false;
      this.basisOpen = true
    },
    showInfoBtn(){
      this.isInfo = false;
      this.formOpen = true
    },
    showBtn() {
      // showBasisBtn
      this.isDis = false;
    },
    cancel() {
      this.isDis = true;
      this.basisOpen = false;
      this.basisForm = this.userInfo;
    },
    Formcancel(){
      this.isInfo = true;
      this.formOpen = false;
      this.form = this.userInfo;
    },
    // 时间格式化
    dateFormat(datetime, fmt){
      datetime = new Date(datetime)
      var o = {
        "M+": datetime.getMonth() + 1, //月份
        "d+": datetime.getDate(), //日
        "h+": datetime.getHours(), //小时
        "m+": datetime.getMinutes(), //分
        "s+": datetime.getSeconds(), //秒
        "q+": Math.floor((datetime.getMonth() + 3) / 3), //季度
        "S": datetime.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    },
  },
};
</script>

<style scoped>
.setprofile {
  position: relative;
}
.profile-tabs {
  width: 100%;
  height: 800px;
  padding-top: 20px;
}
.profile-pane {
  width: 100%;
  height: 800px;
}
.changeInfo {
  width: 80px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: rgba(101, 142, 255, 1);
  text-align: center;
  /* border:1px solid red; */
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
.fa-pencil-square-o {
  margin-left:5px;
}
</style>
