<template>
	<div>
		<h1>我的</h1>
		地址：{{ userInfo.residenceAddress }}
	</div>
</template>

<script type="text/javascript">
export default{
	middleware:'auth',
	data () {
		return {
			userInfo:{}
		}
	},
	async asyncData( { $axios} ){

		let res = await $axios.get('/api/member/getInfo');
		return {
			userInfo:res.data.data
		}
	}
}
</script>