export default ({$axios},inject)=>{

	inject('getFirstCategorys',()=>$axios({
		url:'/api/course/category/getFirstCategorys',
        method:'GET',
	}))


	inject('getSecondCategorys',(categoryId)=>$axios({
		url:'/api/course/category/getSecondCategorys',
        method:'GET',
        params:{categoryId}
	}))


}


