export default ({$axios},inject)=>{

	// 添加商品到购物车
	inject('addShopCar',({courseId,memberId,token})=>$axios({
		url: '/api/shopcar/addShopCar',
	    method: 'POST',
	    data:{
	        courseId,memberId
	    },
	    headers:{
	        'token':token
	    }
	}))

}


