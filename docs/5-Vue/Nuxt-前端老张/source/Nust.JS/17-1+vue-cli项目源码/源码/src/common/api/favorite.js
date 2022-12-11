import request from './requests';
import {Decrypt} from '@/utils/aes'
// 查询收藏
export function getFavoriteList({pageSize,pageNum,token,entity}) {
  return request({
    url: '/api/favorite/getByMemberId',
    method: 'POST',
    data: {
      pageNum,
      pageSize,
      entity
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Decrypt(localStorage.getItem('token')),
      'token': token
    }

  })
}
// 添加收藏 
export function addFavorite({ courseId,token }) {
  return request({
    url: '/api/favorite/addFavorite',
    method: 'POST',
    data: {
      courseId,
    },
    headers: {
      'Authorization': Decrypt(localStorage.getItem('token')),
      'token': token
    }
  })
}

//取消收藏
export function deleteFavorite({memberId,courseId,token }) {
  return request({
    url: '/api/favorite/deleteFavorite',
    method: 'GET',
    params:{
        memberId,
        courseId,
    },
    headers: {
      'Authorization': Decrypt(localStorage.getItem('token')),
      'token': token
    }
  })
}
