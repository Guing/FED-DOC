<template>
	<div>
		{{ id }} 新闻的详情页
	</div>
</template>

<script type="text/javascript">
export default{
	head(){
		return {
			title:this.id,
		    meta: [
		      { hid: 'description', name: 'description', content: '此处是网站描述' },
		      { hid: 'keywords', name: 'keywords', content: '此处是网站关键词' }
		    ]
		}
	},
	data () {
		return {
			id:0
		}
	},
	created(){
		this.id = this.$route.params.id;
	}
}
</script>