export default ({$axios},inject)=>{

	inject('getImageByCode',(imageCode)=>$axios({
		url: '/api/images/getImageByCode',
	    method: 'GET',
	    params: imageCode
	}))


}