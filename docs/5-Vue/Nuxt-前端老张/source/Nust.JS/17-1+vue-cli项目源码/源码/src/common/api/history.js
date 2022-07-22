import request from './requests'
import {Decrypt} from '@/utils/aes'
//记录播放历史
export function recordHistory(data){
    return request({
        url:'/api/course/history/recordHistory',
        method:'POST',
        data,
        headers: {
            'Authorization': Decrypt(localStorage.getItem('token'))
        }
    })
}

//最后一次记录
export function getLastHistoryByChapterId(params){
    return request({
        url:'/api/course/history/getLastHistoryByChapterId',
        method:'GET',
        params,
        headers: {
            'Authorization': Decrypt(localStorage.getItem('token'))
        }
    })
}