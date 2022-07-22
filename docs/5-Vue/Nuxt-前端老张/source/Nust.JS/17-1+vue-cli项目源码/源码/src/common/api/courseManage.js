import request from './requests'
import {Decrypt} from '@/utils/aes'
export function getNewCourse(params){
    return request({
        url:'/api/course/mostNew',
        method:'POST',
        data:params
    })
}

export function getHotCourse(params){
    return request({
        url:'/api/course/mostHeat',
        method:'POST',
        data:params
    })
}

//查询课程
export function queryCourse(params){
    return request({
        url:'/api/course/search',
        method:'POST',
        data:params
    })
}

//课程详情
export function getcourseInfo(courseId){
    return request({
        url:'/api/course/getDetail',
        method:'GET',
        params:{courseId}
    })
}

//播放课程
export function playCourse(courseId,chapterId){
    return request({
        url:'/api/player/play',
        method:'GET',
        params:{courseId,chapterId},
        headers: {
            'Authorization': Decrypt(localStorage.getItem('token'))
        }
    })
}

//下载资料
export function downloadAttachment(courseId,attachmentId){
    let downProgress = {};
    let uniSign = new Date().getTime() + '';
    return request({
        url:'/api/course/downloadAttachment',
        method:'GET',
        params:{courseId,attachmentId},
        responseType: "blob",
        headers: {
            'Authorization': Decrypt(localStorage.getItem('token'))
        },
        onDownloadProgress (progress) {
            console.log(progress);
            downProgress = Math.round(100 * progress.loaded / progress.total) // progress对象中的loaded表示已经下载的数量，total表示总数量，这里计算出百分比
        }}).then( (res)=>{ // 文件流传输完成后，开启文件下载
            if(data.downLoad){
              jsFileDownload(res.data,data.downLoad+'.'+data.url.replace(/.+\./,"")); // jsFileDownLoad是用来下载文件流的，下载插件：npm i js-file-download，import引入：import jsFileDownLoad from 'js-file-download'
            } else {
              jsFileDownload(res.data, data.url.split('/')[data.url.split('/').length-1]);
            }
        }).catch((e)=>{
          this.$message.error('该文件无法下载')
        })
    
}


//检查是否有权限
export function checkAuth(courseId){
    return request({
        url:'/api/course/checkAuth',
        method:'GET',
        params:{courseId},
        headers: {
            'Authorization': Decrypt(localStorage.getItem('token'))
        }
    })
}

//检查是否有权限
export function checkAuthWithChapterId(courseId,chapterId){
    return request({
        url:'/api/course/checkAuth',
        method:'GET',
        params:{courseId,chapterId},
        headers: {
            'Authorization': Decrypt(localStorage.getItem('token'))
        }
    })
}


//获取学习时长
export function updateStudyHour(data,token){
    return request({
        url:'/api/member/updateStudyHour',
        method:'POST',
        data,
        headers: {
            'Authorization': Decrypt(localStorage.getItem('token')),
            'token':token
        }
    })
}