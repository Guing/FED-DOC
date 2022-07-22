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


}