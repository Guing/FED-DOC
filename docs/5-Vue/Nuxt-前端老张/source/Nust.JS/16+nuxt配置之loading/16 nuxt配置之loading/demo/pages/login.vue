<template>
	<div>
		<h1>登录页</h1>
		<input type="" name="" v-model='userName'>
		<input type="" name="" v-model='userPwd'>
		<button @click='login'>登录</button>
	</div>
</template>
<script type="text/javascript">
import qs from 'qs';
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
		login(){
			let data = qs.stringify({
				username:this.userName,
				password:this.userPwd
			});

			this.$axios({
				url:'/api/u/loginByJson',
				method:'post',
				data
			}).then(res=>{
				this.setToken(res.data.accessToken);
				this.$router.push({
					name:'index'
				})
			})
		}
	}
}
</script>