<template>
  <div class="setbindsns">
    <div class="setbindsns-header">
      <p>账号信息</p>
      <p class="header-complete">完成 <span>{{finish}}/4</span></p>
    </div>
    <div class="setbindsns-container">
      <div class="setbindsns-item">
        <div class="item-img">
          <img src="/image/user/phone.png" alt=""/>
        </div>
        <div class="item-center">
          <p class="item-phone"><span>手机</span> {{ userInfo.mobile ?geTel(userInfo.mobile) : '未绑定'}}</p>
          <p>可用手机号加密登录在线网校，可通过手机号找回密码</p>
        </div>
        <div class="item-btn" @click="changePhone">修改绑定</div>
      </div>
      <div class="setbindsns-item">
        <div class="item-img">
          <img src="/image/user/pwd.png" alt=""/>
        </div>
        <div class="item-center">
          <p class="item-phone"><span>密码</span></p>
          <p>用于保护账号信息和登录安全</p>
        </div>
        <div class="item-btn" @click="changePwd">修改密码</div>
      </div>
      <div class="setbindsns-item">
        <div class="item-img">
          <img src="/image/user/mime.png" alt=""/>
        </div>
        <div class="item-center">
          <p class="item-phone"><span>用户名</span></p>
          <p>可用用户名加密码登录在线网校</p>
        </div>
        <div class="item-btn" @click="changeUser" v-if="!userInfo.username">绑定用户</div>
      </div>
      <div class="setbindsns-item">
        <div class="item-img">
          <img src="/image/user/email.png" alt=""/>
        </div>
        <div class="item-center">
          <p class="item-phone"><span>邮箱</span> 未绑定</p>
          <p>可用邮箱加密登录在线网校，可用邮箱找回密码</p>
        </div>
        <div class="item-btn">绑定邮箱</div>
      </div>
    </div>

    <!--    修改手机号-->
    <el-dialog
        title="修改手机号"
        :visible.sync="phoneOpen"
        width="500px"
        :before-close="handlePhoneClose">
      <div class="phoneDialog">
        <div class="tip">为保障您的账号安全和收费课程的正常学习，小鹿希望您能为帐号绑定手机号，更换手机号后请及时换绑。（1个手机号只能绑定1个小鹿线帐号）</div>
        <el-form ref="phoneForm" :model="phoneForm" label-width="80px" :rules="phoneRules">
          <el-form-item label="手机号" prop="mobile">
            <el-col :span="24">
              <el-input v-model="phoneForm.mobile" placeholder="请输入手机号"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-row>
              <el-col :span="16">
                <el-input v-model="phoneForm.captcha" placeholder="请输入验证码"
                          @keyup.enter.native="onPhoneSubmit('phoneForm')"></el-input>
              </el-col>
              <el-col :span="8">
                <el-button class="sendCode" @click="showVerify('phoneForm')">{{ captcha }}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="24">
                <el-button type="primary" @click="onPhoneSubmit('phoneForm')" class="phoneSubmit">确认</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!--  修改密码对话框  -->
    <el-dialog
        title="修改密码"
        :visible.sync="pswOpen"
        width="400px"
        :before-close="handlePswClose">
      <div>
        <el-form ref="pswForm" :model="pswForm" label-width="80px" :rules="pswRules">
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input show-password v-model="pswForm.oldPwd" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input show-password v-model="pswForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input show-password v-model="pswForm.repassword" placeholder="请输入密码"
                      @keyup.enter.native="onPswSubmit('pswForm')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="24">
                <el-button type="primary" @click="onPswSubmit('pswForm')" class="changepass">确认</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!--  修改用户名  -->
    <el-dialog
        title="修改用户名"
        :visible.sync="usernameOpen"
        width="400px"
        :before-close="handleUsernameClose">
      <div class="username-dialog">
        <p></p>
        <el-form ref="userForm" :model="userForm" label-width="80px" :rules="userRules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input show-password v-model="userForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input show-password v-model="userForm.repassword" placeholder="请输入再次密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="24">
                <el-button type="primary" @click="onUserSubmit('userForm')" class="changepass">确认</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>

    </el-dialog>
    <!--    行为验证-->
    <Verify
        ref="verify"
        :captcha-type="'blockPuzzle'"
        :img-size="{width:'400px',height:'200px'}"
        @success="success"
        @error="error"
    />

  </div>
</template>

<script>
import { sendModifyMobileCaptcha } from '@/common/api/sms'
import Verify from '@/components/verifition/Verify'
import {
	modifyMobile,
	createToken,
	getInfo,
	logout,
	modifyPassword,
	modifyUsername,
} from '@/common/api/auth'
import { Encrypt } from '@/utils/aes.js'
import { mapState, mapActions, mapMutations } from 'vuex'
import { Loading } from 'element-ui'
export default {
	data() {
		return {
			crtType: 'changePhone',
			phoneOpen: false, // 修改手机号对话框
			phoneForm: {}, // 修改手机号表单
			phoneRules: {
				mobile: [
					{
						required: true,
						message: '请输入手机号',
						trigger: 'blur',
					},
					{
						pattern: /^1[3456789]\d{9}$/,
						message: '目前只支持中国大陆的手机号码',
					},
				],
				captcha: [
					{
						required: true,
						message: '请输入验证码',
						trigger: 'blur',
					},
				],
			},
			sendTimer: null, // 修改手机号 发送
			captcha: '发送验证码',
			pswOpen: false, // 修改密码
			pswForm: {},
			pswRules: {
				oldPwd: [
					{
						required: true,
						message: '请输入旧密码',
						trigger: 'blur',
					},
					{
						min: 6,
						max: 30,
						message: '长度在 6 到 30 个字符',
						trigger: 'blur',
					},
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{
						min: 6,
						max: 30,
						message: '长度在 6 到 30 个字符',
						trigger: 'blur',
					},
				],
				repassword: [
					{
						required: true,
						message: '请输入确认密码',
						trigger: 'blur',
					},
					{
						min: 6,
						max: 30,
						message: '长度在 6 到 30 个字符',
						trigger: 'blur',
					},
				],
			},
			usernameOpen: false, // 修改用户名
			userForm: {},
			userRules: {
				username: [
					{
						required: true,
						message: '请输入用户名',
						trigger: 'blur',
					},
					{
						min: 6,
						max: 18,
						message: '长度在 6 到 18 个字符',
						trigger: 'blur',
					},
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{
						min: 6,
						max: 30,
						message: '长度在 6 到 30 个字符',
						trigger: 'blur',
					},
				],
				repassword: [
					{
						required: true,
						message: '请输入确认密码',
						trigger: 'blur',
					},
					{
						min: 6,
						max: 30,
						message: '长度在 6 到 30 个字符',
						trigger: 'blur',
					},
				],
			},
		}
	},
	computed: {
		...mapState({
			userInfo: (state) => state.user.userInfo,
		}),
		finish() {
			let num = 0
			if (this.userInfo.mobile) {
				num += 1
			}
			if (this.userInfo.username) {
				num += 1
			}
			if (this.userInfo.password) {
				num += 1
			}
			if (this.userInfo.email) {
				num += 1
			}
			return num
		},
	},
	components: {
		Verify,
	},
	methods: {
		...mapActions(['saveUserInfoAction']),
		success(e) {
			switch (this.crtType) {
				case 'changePhone':
					this.phoneForm.captchaVerification = e.captchaVerification
					this.sendCodes()
					break
			}
		},
		error() {},
		showVerify(formName) {
			if (this.phoneForm) {
				if (this.pswForm.password === this.pswForm.repassword) {
					this.$refs.verify.show()
				} else {
					this.$message({
						message: '两次密码不一样，请重新输入',
						type: 'warning',
					})
					this.pswForm = {}
					this.$refs.pswForm.validateField()
				}
			} else {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$refs.verify.show()
					} else {

					}
				})
			}
		},
		// 隐藏中间四位
		geTel(tel) {
			let reg = /^(\d{3})\d{4}(\d{4})$/
			return tel.replace(reg, '$1****$2')
		},
		// 修改手机号绑定
		changePhone() {
			this.phoneOpen = true
			this.phoneForm = {}
			this.crtType = 'changePhone'
		},
		// 发送验证码
		sendCodes() {
			let reg = /^1[3456789]\d{9}$/
			if (!reg.test(this.phoneForm.mobile)) {
				this.$message({
					message: '手机号输入错误，请检查',
					type: 'warning',
				})
			} else {
				if (this.phoneForm.mobile) {
					let mobile = Encrypt(this.phoneForm.mobile)
					this.captcha = '重新发送60秒'
					this.sendCode(mobile)
					let time = 60
					clearInterval(this.sendTimer)
					this.sendTimer = setInterval(() => {
						time--
						if (time <= 0) {
							clearInterval(this.sendTimer)
							time = 60
							this.captcha = '发送验证码'
							this.isSend = false
						} else {
							this.captcha = `重新发送${time}秒`
						}
					}, 1000)
				} else {
					this.$message({
						message: '请先填写手机号哟',
						type: 'warning',
					})
				}
			}
		},
		// 发送请求
		sendCode(mobile) {
			sendModifyMobileCaptcha({
				mobile: mobile,
			})
				.then((res) => {
					if (res.meta.code === '200') {
						this.$message({
							message: '发送成功',
							type: 'success',
						})
					} else {
						this.$message({
							message: res.meta.msg,
							type: 'error',
						})
					}
				})
				.catch((err) => {
					this.$message({
						message: err.meta.code,
						type: 'error',
					})
				})
		},
		onPhoneSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.phoneForm.mobile) {
						var phoneloading = Loading.service({
							lock: true,
							text: 'Loading',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)',
						})
						let mobile = Encrypt(this.phoneForm.mobile)
						let userId = this.userInfo.id
						let captcha = this.phoneForm.captcha
						let captchaVerification = this.phoneForm
							.captchaVerification
						createToken().then((res) => {
							let token = res.data.token
							modifyMobile({
								token: token,
								mobile: mobile,
								userId: userId,
								captcha: captcha,
								captchaVerification: captchaVerification,
							})
								.then((ress) => {
									if (ress.meta.code === '200') {
										this.$message({
											message: '修改成功，重新登录',
											type: 'success',
										})
										this.$nextTick(() => {
											// 以服务的方式调用的 Loading 需要异步关闭
											phoneloading.close()
										})
										this.goLogout()
										this.phoneOpen = false
									} else {
										this.$message({
											message: ress.meta.msg,
											type: 'warning',
										})
										this.$nextTick(() => {
											// 以服务的方式调用的 Loading 需要异步关闭
											phoneloading.close()
										})
										clearInterval(this.sendTimer)
										// time = 60
										this.captcha = '发送验证码'
										this.isSend = false
									}
								})
								.catch((err) => {
									this.$message({
										message: err.meta.msg,
										type: 'warning',
									})
									this.$nextTick(() => {
										// 以服务的方式调用的 Loading 需要异步关闭
										phoneloading.close()
									})
									clearInterval(this.sendTimer)
									// time = 60
									this.captcha = '发送验证码'
									this.isSend = false
								})
						})
					} else {
						this.$message({
							message: '请填写手机号',
							type: 'warning',
						})
					}
				} else {
					this.$message({
						message: '未通过验证',
						type: 'warning',
					})
				}
			})
		},
		handlePhoneClose() {
			this.phoneOpen = false
			this.phoneForm = {}
			// this.$refs.phoneForm.resetFields()
		},
		// 修改密码
		changePwd() {
			// this.pswOpen = true
			if (!this.userInfo.username) {
				this.$message({
					message: '用户名为空，请先设置用户名',
					type: 'warning',
				})
			} else {
				this.pswForm = {}
				this.pswOpen = true
				this.crtType = 'changePwd'
			}
		},
		handlePswClose() {
			this.pswOpen = false
			this.pswForm = {}
		},
		onPswSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.pswForm.password === this.pswForm.repassword) {
						var psdloading = Loading.service({
							lock: true,
							text: 'Loading',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)',
						})
						let oldPwd = Encrypt(this.pswForm.oldPwd)
						let password = Encrypt(this.pswForm.password)
						let repassword = Encrypt(this.pswForm.repassword)
						let captchaVerification = this.pswForm
							.captchaVerification
						let id = this.userInfo.id
						createToken().then((res) => {
							let token = res.data.token
							modifyPassword({
								token,
								oldPwd,
								password,
								repassword,
								id,
								captchaVerification,
							}).then((ress) => {
								if (ress.meta.code === '200') {
									this.$message({
										message: '修改密码成功',
										type: 'success',
									})
									this.pswOpen = false
									this.$nextTick(() => {
										// 以服务的方式调用的 Loading 需要异步关闭
										psdloading.close()
									})
									// 退出登录
									this.goLogout()
								} else if (ress.meta.code === '10009') {
									this.$message({
										message: ress.meta.msg,
										type: 'warning',
									})
									this.$nextTick(() => {
										// 以服务的方式调用的 Loading 需要异步关闭
										psdloading.close()
									})
								} else {
									this.$message({
										message: ress.meta.msg,
										type: 'warning',
									})
									this.$nextTick(() => {
										// 以服务的方式调用的 Loading 需要异步关闭
										psdloading.close()
									})
									this.pswForm = {}
									// this.$refs.pswForm.validateField()
								}
							})
						})
						// modifyPassword()
					} else {
						this.$message({
							message: '两次密码不一样，请重新输入',
							type: 'warning',
						})
					}
				} else {
					this.$message({
						message: '输入有误，请检查',
						type: 'warning',
					})
				}
			})
		},
		// 修改用户
		changeUser() {
			this.usernameOpen = true
			this.userForm = {}
			this.crtType = 'changeUser'
			// this.$refs.userForm.validateField()
		},
		handleUsernameClose() {
			this.usernameOpen = false
			this.userForm = {}
			// this.$refs.userForm.validateField()
		},
		onUserSubmit(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.userForm.password === this.userForm.repassword) {
						var userloading = Loading.service({
							lock: true,
							text: 'Loading',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)',
						})
						let username = Encrypt(this.userForm.username)
						let password = Encrypt(this.userForm.password)
						let repassword = Encrypt(this.userForm.repassword)
						let captchaVerification = this.pswForm
							.captchaVerification
						let id = this.userInfo.id
						createToken().then((res) => {
							let token = res.data.token
							modifyUsername({
								token,
								username,
								password,
								repassword,
								captchaVerification,
								id,
							}).then((ress) => {
								if (ress.meta.code === '200') {
									this.$message({
										message: ress.meta.msg,
										type: 'success',
									})
									this.$nextTick(() => {
										// 以服务的方式调用的 Loading 需要异步关闭
										userloading.close()
									})
									this.usernameOpen = false
									// 退出登录
									this.goLogout()
								} else if (ress.meta.code === '10009') {
									this.$message({
										message: res.meta.msg,
										type: 'error',
									})
									this.$nextTick(() => {
										// 以服务的方式调用的 Loading 需要异步关闭
										userloading.close()
									})
								} else {
									this.$message({
										message: res.meta.msg,
										type: 'error',
									})
									this.$nextTick(() => {
										// 以服务的方式调用的 Loading 需要异步关闭
										userloading.close()
									})
									this.userForm = {}
									// this.$ref.validateField()
								}
							})
						})
						// modifyPassword()
					} else {
						this.$message({
							message: '两次密码不一样，请重新输入',
							type: 'warning',
						})
					}
				}
			})
		},
		// 退出登录
		goLogout() {
			logout()
				.then((res) => {
					this.$message({
						type: 'success',
						message: '退出成功!',
					})
					localStorage.removeItem('token')
					//sessionStorage.removeItem('userInfo')
					localStorage.removeItem('isLogin')
					// this.$router.push('/home')
          window.location.href = '/home'
					// this.$router.go(0)
					// this.saveUserInfoAction()
					this.saveLoginAction(false)
				})
				.catch((err) => {})
		},
	},
}
</script>

<style scoped>
.changepass {
	margin-left: 200px;
}

.phoneSubmit {
	margin-left: 300px;
}

.sendCode {
	width: 100%;
	border: none;
}

.phoneDialog .tip {
	width: 400px;
	margin: 0 auto 20px;
}

.setbindsns {
	width: 1000px;
	height: 700px;
	padding-top: 20px;
}

.setbindsns-header {
	width: 100%;
	height: 40px;
	line-height: 40px;
	font-size: 18px;
	font-family: Microsoft YaHei;
	font-weight: bold;
	color: #333333;
	display: flex;
}

.header-complete {
	margin-left: 40px;
	font-size: 14px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: rgba(161, 153, 159, 1);
}

.header-complete span {
	color: #ff1626;
}

.setbindsns-container {
	width: 100%;
	height: 700px;
}

.setbindsns-item {
	display: flex;
	align-items: center;
	/* justify-content: space-around; */
	height: 90px;
	width: 100%;
	font-size: 14px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #333333;
	border-top: 1px solid rgba(112, 112, 112, 0.3);
}

.item-img {
	width: 90px;
	height: 90px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.item-img img {
	width: 28px;
	height: 40px;
}

.item-phone {
	color: #ff1626;
	margin-bottom: 5px;
}

.item-phone span {
	font-weight: 700;
	font-size: 18px;
	color: #333333;
	margin-right: 5px;
}

.item-center {
	width: 800px;
}

.item-btn {
	padding: 5px 20px;
	border: 1px solid rgba(112, 112, 112, 1);
	border-radius: 15px;
	cursor: pointer;
}
</style>
