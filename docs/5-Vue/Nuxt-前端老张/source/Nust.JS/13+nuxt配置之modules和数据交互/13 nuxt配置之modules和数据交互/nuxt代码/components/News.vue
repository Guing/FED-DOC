<template>
	<div>
		这是news
		<ol>
			<li v-for='item in items' :key='item.id'>
				{{item.imageName}}
			</li>
		</ol>
	</div>
</template>

<script type="text/javascript">
export default{
	data () {
		return {
			items:[]
		}
	},
	async fetch(  ){
		let res = await this.$axios.get('http://testapi.xuexiluxian.cn/api/slider/getSliders');
	  	let items = res.data.data.list;
	  	this.items = items;
	}
}
</script>