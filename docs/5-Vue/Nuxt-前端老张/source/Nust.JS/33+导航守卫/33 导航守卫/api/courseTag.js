export default ({$axios},inject)=>{

	inject('queryCourseTag',(params)=>$axios({
		url:'/api/course/tags/list',
	    method:'POST',
	    data:params,
	    header:{
	        'Content-Type':'application/json'
	    }
	}))
	
}


