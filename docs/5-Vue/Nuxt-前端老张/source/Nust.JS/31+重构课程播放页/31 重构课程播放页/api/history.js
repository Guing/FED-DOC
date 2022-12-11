export default ({$axios},inject)=>{

	//记录播放历史
	inject('recordHistory',(data)=>$axios({
		url:'/api/course/history/recordHistory',
        method:'POST',
        data,
	}))

	

	//最后一次记录
	inject('getLastHistoryByChapterId',(params)=>$axios({
		url:'/api/course/history/getLastHistoryByChapterId',
        method:'GET',
        params,
	}))


}


