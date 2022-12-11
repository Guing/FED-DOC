import request from './requests';
import {Decrypt} from '@/utils/aes'
// 查询购物车商品
export function getShopCarList(){
  return request({
    url: '/api/shopcar/getShopCarList',
    method: 'GET',
    headers: {
        'Authorization': Decrypt(localStorage.getItem('token'))
    }
  })
}

// 添加商品到购物车
export function addShopCar({courseId,memberId,token}){
  return request({
    url: '/api/shopcar/addShopCar',
    method: 'POST',
    data:{
        courseId,memberId
    },
    headers:{
        'Authorization':Decrypt(localStorage.getItem('token')),
        'token':token
    }
  })
}

// 修改购物车数量
export function updateShopCar(params){
  return request({
    url: '/api/shopcar/updateShopCar',
    method: 'POST',
    data: params
  })
}

// 删除购物车数据
export function deleteShopCar({id,token}){
    return request({
      url: '/api/shopcar/deleteShopCar',
      method: 'GET',
      params:{id},
      headers:{
          'Authorization': Decrypt(localStorage.getItem('token')),
          'token':token
      }
    })
  }

// 删除购物车数据
export function deleteShopCars(ids,token){
    return request({
        url: '/api/shopcar/deleteShopCars',
        method: 'POST',
        data: ids,
        headers:{
            'Authorization': Decrypt(localStorage.getItem('token')),
            'token':token
        }
    })
}