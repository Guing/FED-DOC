export default ( app )=>{

	let token = app.$cookies.get('token');
	app.store.commit('setToken',token);

	if( !token ){
		app.redirect('/login');
	}

}