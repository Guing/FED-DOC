export default ({store,route,redirect,params,query,req,res})=>{
	//console.log( store.state, 'middleware' );
	// if( route.name == 'News' ){
	// 	redirect('/about');
	// }
	store.commit('getToken');
	if( !store.state.token ){
		redirect('/login');
	}
	
}