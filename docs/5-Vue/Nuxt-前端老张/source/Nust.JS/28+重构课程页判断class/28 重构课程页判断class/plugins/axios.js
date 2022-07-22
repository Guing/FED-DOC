import {  Decrypt  } from '~/utils/aes'
export default ( {$axios , store } )=>{

	$axios.onRequest(config=>{
		let token = store.state.user.token;
		if( token ){
			//设置token
			config.headers['Authorization'] = Decrypt(token);
		}
		return config;
	})

	$axios.onResponse(response=>{

		return response.data;
		
	})

}