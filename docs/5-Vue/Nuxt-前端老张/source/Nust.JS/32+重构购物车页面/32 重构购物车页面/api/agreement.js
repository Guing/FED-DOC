export default ({$axios},inject)=>{

	inject('getAgreementByCode',(code)=>$axios({
		url: '/api/agreement/getAgreementByCode',
    	method: 'GET',
    	params: { code },
	}))


}


