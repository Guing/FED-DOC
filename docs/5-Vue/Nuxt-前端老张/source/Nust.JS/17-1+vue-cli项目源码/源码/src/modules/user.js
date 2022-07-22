
export default {
	state:{
		userInfo: {
			avatar: '/image/common/avator.png',
			nickname: '小鹿线-默认',
			gender: 1,
			city: '北京',
			id:1,
		},
		isLogin: JSON.parse(localStorage.getItem('isLogin'))  || false,
    cartNum: 0,
    loginDialog:false
	},
	getters:{
		avatar:state => state.userInfo.avatar
	},
	mutations:{
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
