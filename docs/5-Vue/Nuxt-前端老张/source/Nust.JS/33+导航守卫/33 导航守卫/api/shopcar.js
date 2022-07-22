export default ({$axios},inject)=>{

	// 查询购物车商品
	inject('getShopCarList',()=>$axios({
		url: '/api/shopcar/getShopCarList',
    	method: 'GET',
	}))


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


	// 删除购物车数据
	inject('deleteShopCar',({id,token})=>$axios({
		url: '/api/shopcar/deleteShopCar',
	      method: 'GET',
	      params:{id},
	      headers:{
	          'token':token
	      }
	}))


}


