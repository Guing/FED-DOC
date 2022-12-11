<template>
	<div>
		<input type="search" name="" @keyup.enter='goList'> 搜索页
	</div>
</template>
<script type="text/javascript">
export default{
	methods:{
		goList(){
			this.$router.push('/search/list')
		}
	}
}
</script>