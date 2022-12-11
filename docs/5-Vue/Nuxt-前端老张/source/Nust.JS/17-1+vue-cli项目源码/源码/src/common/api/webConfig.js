import request from './requests';

export function webConfig(){
    return request({
        url: '/api/setting/get',
    })
}
