import request from './requests';

// 发送注册或登录验证码
export function sendRegisterOrLoginCaptcha ({mobile}){
  return request({
    url: '/api/sms/sendRegisterOrLoginCaptcha?mobile='+mobile,
    method: 'GET'
  })
}

export function sendFindPasswordCaptcha({mobile}) {
  return request({
    url: '/api/sms/sendFindPasswordCaptcha?modile='+mobile,
    method: 'GET'
  })
}

// 发送修改手机号验证码

export function sendModifyMobileCaptcha({mobile}) {
  return request({
    url: '/api/sms/sendModifyMobileCaptcha?mobile='+mobile,
    method: 'GET'
  })
}
