import request from './requests'
import {Decrypt} from '@/utils/aes'

export function createToken(){ 
  return request({
    url: '/api/token/createToken',
    method: 'POST'
  })
}