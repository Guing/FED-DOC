export const state = {
	token:''
}
export const mutations = {
	setToken(state,token){
		state.token = token;
	}
}
export const actions = {
	nuxtServerInit(store , context ){
		store.commit('setToken','')
		console.log( 'nuxtServerInit' );
	}
}