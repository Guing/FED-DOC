export default ( {$axios} )=>{

	$axios.onRequest(config=>{
		return config;
	})

	$axios.onResponse(response=>{

		return response.data;
		
	})

}