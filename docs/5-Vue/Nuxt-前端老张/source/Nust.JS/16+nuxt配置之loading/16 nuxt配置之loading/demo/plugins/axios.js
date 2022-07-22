export default ( { $axios,store } )=>{

	//Request拦截器，设置token
	$axios.onRequest((config)=>{
		console.log( 111 );
		config.headers['Authorization'] = store.state.token;
	})

	//Error拦截器 : 出现错误的时候被调用
	$axios.onRequest((error)=>{
		console.log(222 );
	})

	$axios.onResponse((response)=>{
		console.log( 333);
		return response.data;
	})

}