export default ({$axios},inject)=>{

	// 获取购物车数据
	inject('getShopCarCounter',()=>$axios({
		url: '/api/shopcar/getShopCarCounter',
	    method: 'GET',
	}))

}


