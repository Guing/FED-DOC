<template>
	<div>
		<input type="" name="" v-model='userName'>
		<input type="" name="" v-model='userPwd'>
		<button @click='btnLogin'>登录</button>
	</div>
</template>

<script type="text/javascript">
import {mapMutations} from 'vuex'
export default{
	data () {
		return {
			userName:'',
			userPwd:''
		}
	},
	methods:{
		...mapMutations(['setToken']),
		btnLogin(){
			if( this.userName != 'admin' ) return;
			if( this.userPwd !='123456') return;
			this.setToken('abc123');
			this.$router.push({name:'index'});
		}
	}
}
</script>