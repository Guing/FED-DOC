import request from './requests';

export function getImageByCode(imageCode){
  return request({
    url: '/api/images/getImageByCode',
    method: 'GET',
    params: imageCode
  })
}
