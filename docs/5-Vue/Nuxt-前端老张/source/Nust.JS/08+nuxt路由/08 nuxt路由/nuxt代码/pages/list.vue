<template>
	<div>
		列表页
	</div>
</template>

<script type="text/javascript">
export default{
	validate({params,query}){
	  	return /^\d+$/.test( query.a );
	},
	created(){
		console.log( this.$route )
	}
}
</script>