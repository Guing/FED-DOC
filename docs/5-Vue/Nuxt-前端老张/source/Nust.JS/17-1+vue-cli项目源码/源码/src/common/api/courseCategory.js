import request from './requests'

export function getFirstCategorys(){
    return request({
        url:'/api/course/category/getFirstCategorys',
        method:'GET',
    })
}

export function getSecondCategorys(categoryId){
    return request({
        url:'/api/course/category/getSecondCategorys',
        method:'GET',
        params:{categoryId}
    })
}