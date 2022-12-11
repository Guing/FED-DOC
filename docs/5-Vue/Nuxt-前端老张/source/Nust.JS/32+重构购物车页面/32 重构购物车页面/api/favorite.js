export default ({$axios},inject)=>{

	// 查询收藏
	inject('getFavoriteList',({pageSize,pageNum,token,entity})=>$axios({
		url: '/api/favorite/getByMemberId',
	    method: 'POST',
	    data: {
	      pageNum,
	      pageSize,
	      entity
	    },
	    headers: {
	      'Content-Type': 'application/json',
	      'token': token
	    }
	}))


	
	// 添加收藏 
	inject('addFavorite',({ courseId,token })=>$axios({
		url: '/api/favorite/addFavorite',
	    method: 'POST',
	    data: {
	      courseId,
	    },
	    headers: {
	      'token': token
	    }
	}))

	//取消收藏
	inject('deleteFavorite',({memberId,courseId,token })=>$axios({
		url: '/api/favorite/deleteFavorite',
	    method: 'GET',
	    params:{
	        memberId,
	        courseId,
	    },
	    headers: {
	      'token': token
	    }
	}))
	


}


