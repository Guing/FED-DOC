export default ({$axios},inject)=>{

	inject('createToken',()=>$axios({
		url: '/api/token/createToken',
    	method: 'POST'
	}))

}


