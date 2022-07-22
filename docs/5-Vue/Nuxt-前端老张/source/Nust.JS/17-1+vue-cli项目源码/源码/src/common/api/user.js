import request from './requests';
import {Decrypt} from '@/utils/aes'
// /member/update

// 更新头像
export function updateUserInfo({token,...params}){
  return request({
    url: '/api/member/update',
    method: 'POST',
    data: {
      ...params
    },
    headers: {
      'Authorization': Decrypt(localStorage.getItem('token')),
      'token': token
    }
  })
}
