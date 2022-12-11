import request from './requests';
import {Decrypt} from '@/utils/aes'
// 查询收藏商品
export function getByMemberId(params) {
  return request({
    url: '/api/message/getByMemberId',
    method: 'POST',
    data: params,
    headers: {
      'Authorization': Decrypt(localStorage.getItem('token'))
    }
  })
}

// 添加收藏
// /message/get

export function getMess({id,token}){
  return request({
    url: '/api/message/get?id='+id,
    method: 'GET',
    headers: {
      'Authorization': Decrypt(localStorage.getItem('token')),
      'token': token
    }
  })
}

// 删除收藏
export function deleteMess({ids,token}){
  return request({
    url: '/api/message/delete',
    method: 'POST',
    data: ids,
    headers: {
      'Authorization': Decrypt(localStorage.getItem('token')),
      'token': token
    }
  })
}

// 标记已读
export function makeRead({ids,token}){
  return request({
    url: '/api/message/makeRead',
    method: 'POST',
    data: ids,
    headers: {
      'Authorization':Decrypt(localStorage.getItem('token')),
      'token': token
    }
  })
}
