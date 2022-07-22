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


}