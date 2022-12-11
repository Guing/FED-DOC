export default ({$axios},inject)=>{

	inject('getNewCourse',(params)=>$axios({
		url:'/api/course/mostNew',
        method:'POST',
        data:params
	}))

	
	inject('getHotCourse',(params)=>$axios({
		url:'/api/course/mostHeat',
        method:'POST',
        data:params
	}))

	//查询课程
	inject('queryCourse',(params)=>$axios({
		url:'/api/course/search',
        method:'POST',
        data:params
	}))

	//课程详情
	inject('getcourseInfo',(courseId)=>$axios({
		url:'/api/course/getDetail',
        method:'GET',
        params:{courseId}
	}))


	//下载资料
	inject('downloadAttachment',(courseId,attachmentId)=>$axios({
		url:'/api/course/downloadAttachment',
        method:'GET',
        params:{courseId,attachmentId},
        responseType: "blob",
	}))


	//检查是否有权限
	inject('checkAuth',(courseId)=>$axios({
		url:'/api/course/checkAuth',
        method:'GET',
        params:{courseId},
	}))

	//检查是否有权限
	inject('checkAuthWithChapterId',(courseId,chapterId)=>$axios({
		url:'/api/course/checkAuth',
        method:'GET',
        params:{courseId,chapterId},
	}))

	//播放课程
	inject('playCourse',(courseId,chapterId)=>$axios({
		url:'/api/player/play',
        method:'GET',
        params:{courseId,chapterId},
	}))

	//获取学习时长
	inject('updateStudyHour',(data,token)=>$axios({
		url:'/api/member/updateStudyHour',
        method:'POST',
        data,
        headers: {
            'token':token
        }
	}))

	
}