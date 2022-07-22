import request from './requests';
import {Decrypt} from '@/utils/aes'
// /order/getByMemberId
// 查询订单
export function settlement(params){
  return request({
    url: '/api/order/settlement',
    method: 'POST',
    data: params,
    headers: {
      'Authorization': Decrypt(localStorage.getItem('token'))
    }
  })
}

//微信结算
export function wxpay(params){
    return request({
      url: '/api/pay/wxpay/createOrder',
      method: 'POST',
      data: params,
      headers: {
        'Authorization':Decrypt(localStorage.getItem('token'))
      }
    })
  }
  //支付宝结算
export function zfbpay(params){
    return request({
      url: '/api/pay/alipay/createOrder',
      method: 'POST',
      data: params,
      headers: {
        'Authorization': Decrypt(localStorage.getItem('token'))
      }
    })
}


//支付宝
export function queryOrderWithAli(orderNumber){
    return request({
      url: '/api/pay/alipay/queryOrder',
      method: 'GET',
      params: orderNumber,
      headers: {
        'Authorization': Decrypt(localStorage.getItem('token'))
      }
    })
}

export function queryOrderWithWX(orderNumber){
    return request({
      url: '/api/pay/wxpay/queryOrder',
      method: 'GET',
      params: orderNumber,
      headers: {
        'Authorization': Decrypt(localStorage.getItem('token'))
      }
    })
}
