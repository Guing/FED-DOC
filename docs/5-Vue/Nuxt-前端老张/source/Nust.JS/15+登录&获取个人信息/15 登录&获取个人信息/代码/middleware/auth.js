export default ( {store,redirect} )=>{

	store.commit('getToken');
	if( !store.state.token ){
		redirect('/login');
	}

}