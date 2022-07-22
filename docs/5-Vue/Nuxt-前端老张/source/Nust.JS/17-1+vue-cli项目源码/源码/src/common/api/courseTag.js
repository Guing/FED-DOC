import request from './requests'

export function queryCourseTag(params){
    return request({
        url:'/api/course/tags/list',
        method:'POST',
        data:params,
        header:{
            'Content-Type':'application/json'
        }
    })
}