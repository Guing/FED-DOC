export const state = {
	token: ''
}
export const mutations = {
	setToken(state,token){
		state.token = token;
		this.$cookies.set('token',token);
	},
	getToken(state){
		state.token = this.$cookies.get('token');
	}
}