import request from './requests';

// 上传单个文件

// uploadFile
export function uploadFileWithBlob(params){
  return request({
    url: '/api/upload/uploadFileWithBlob',
    method: 'POST',
    data: params
  })
}

export function uploadFile(params){
  return request({
    url: '/api/upload/uploadFilew',
    method: 'POST',
    data: params
  })
}