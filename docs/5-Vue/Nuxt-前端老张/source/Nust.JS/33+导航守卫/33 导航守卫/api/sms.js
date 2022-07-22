export default ({$axios},inject)=>{

	// 发送注册或登录验证码
	inject('sendRegisterOrLoginCaptcha',({mobile})=>$axios({
		url: '/api/sms/sendRegisterOrLoginCaptcha?mobile='+mobile,
    	method: 'GET'
	}))


	inject('sendFindPasswordCaptcha',({mobile})=>$axios({
		url: '/api/sms/sendFindPasswordCaptcha?modile='+mobile,
   		method: 'GET'
	}))


	// 发送修改手机号验证码
	inject('sendModifyMobileCaptcha',({mobile})=>$axios({
		url: '/api/sms/sendModifyMobileCaptcha?mobile='+mobile,
    	method: 'GET'
	}))

}