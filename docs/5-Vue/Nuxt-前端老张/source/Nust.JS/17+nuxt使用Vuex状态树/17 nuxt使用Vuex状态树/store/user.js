export const state = () => ({
  nickname: '张三'
})

export const mutations = {
	changeName( state , name ){
		state.nickname = name;
	}
}