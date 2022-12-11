import request from './requests';
import {Decrypt} from '@/utils/aes'
// /order/getByMemberId
// 查询订单
export function getByMemberId(params){
  return request({
    url: '/api/order/getByMemberId',
    method: 'POST',
    data: params,
    headers: {
      'Authorization': Decrypt(localStorage.getItem('token'))
    }
  })
}