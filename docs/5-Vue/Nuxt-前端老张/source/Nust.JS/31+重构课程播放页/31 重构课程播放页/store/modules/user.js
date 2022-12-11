export default {
	state:{
		userInfo: {
			avatar: '/image/common/avator.png',
			nickname: '小鹿线-默认',
			gender: 1,
			city: '北京',
			id:1,
		},
		token:'',
		//登录的状态
		isLogin: false,
    	cartNum: 0,
    	loginDialog:false
	},
	getters:{
		avatar:state => state.userInfo.avatar
	},
	mutations:{
		setToken( state , token ){
			if( token ){
				//存储到vuex中
				state.token = token;
				//登录的状态
				state.isLogin = true;
				//token持久化存储
				this.$cookies.set('token',token);
			}
		},
		removeUser(state){
			state.userInfo = {
				avatar: '/image/common/avator.png',
				nickname: '小鹿线-默认',
				gender: 1,
				city: '北京',
				id:1,
			}
			state.token = '';
			state.isLogin = false;
			this.$cookies.remove('token');

			
		},	
		saveUserInfo(state,payload){
			state.userInfo = payload
		},
		saveLogin(state,payload) {
			state.isLogin = payload
		},
		saveAvator(state,payload){
			state.userInfo.avatar = payload
		},
        saveCartNum(state,payload){
            state.cartNum = payload
        },
        saveLoginDialog(state,payload){
            state.loginDialog = payload
        }
	},
	actions:{
		saveUserInfoAction({commit},payload){
			commit('saveUserInfo',payload)
		},
		saveLoginAction({commit},payload){
			commit('saveLogin',payload)
		},
		saveAvatorAction({commit},payload){
			commit('saveAvator',payload)
		},
        saveCartNumAction({commit},payload){
            commit('saveCartNum',payload)
        }
	}
}
