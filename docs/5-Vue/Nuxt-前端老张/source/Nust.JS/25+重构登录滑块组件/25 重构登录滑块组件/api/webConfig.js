export default ({$axios},inject)=>{

	inject('webConfig',()=>$axios({
		url: '/api/setting/get',
	}))

}