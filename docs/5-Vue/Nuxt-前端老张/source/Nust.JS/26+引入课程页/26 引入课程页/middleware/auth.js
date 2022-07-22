export default ( app )=>{

	//从cookie中读取token
	let token = app.$cookies.get('token');
	app.store.commit('setToken',token);

}