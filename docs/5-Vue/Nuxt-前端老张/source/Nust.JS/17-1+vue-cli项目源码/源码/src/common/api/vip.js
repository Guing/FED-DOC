import request from './requests';
import {Decrypt} from '@/utils/aes'
// 查询所有会员等级
export function getAllVips(params){
  return request({
    url: '/api/vip/getAllVips',
    method: 'POST',
    data: params
  })
}

//会员去结算
export function settlement({id,token}){
  return request({
    url: '/api/vip/settlement',
    method: 'GET',
    params:{id},
    headers: {
      'Authorization':Decrypt(localStorage.getItem('token')),
      'token': token
    }
  })
}

//微信结算
export function wxpay({vipId, payModes, isRenew, token}){
  return request({
    url: '/api/vip/wxpay/createOrder',
    method: 'POST',
    data: {vipId, payModes, isRenew},
    headers: {
      'Authorization':Decrypt(localStorage.getItem('token')),
      'token': token
    }
  })
}

//支付宝结算
export function zfbpay({vipId, payModes, isRenew, token}){
  return request({
    url: '/api/vip/alipay/createOrder',
    method: 'POST',
    data: {vipId, payModes, isRenew},
    headers: {
      'Authorization': Decrypt(localStorage.getItem('token')),
      'token': token
    }
  })
}

//兑换课程或会员
export function doExchange({exchangeCode,token}){
  return request({
    url: '/api/exchange/doExchange',
    method: 'GET',
    params:{exchangeCode},
    headers: {
      'Authorization':Decrypt(localStorage.getItem('token')),
      'token': token
    }
  })
}


