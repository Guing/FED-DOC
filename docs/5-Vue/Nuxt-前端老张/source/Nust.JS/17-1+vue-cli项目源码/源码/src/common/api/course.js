import request from './requests';
import {Decrypt} from '@/utils/aes'
export function myCourses(imageCode){
  return request({
    url: '/api/course/myCourses',
    method: 'POST',
    data: imageCode,
    headers: {
      'Authorization':  Decrypt(localStorage.getItem('token'))
    }
  })
}