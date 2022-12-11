<template>
	<div>
		<h1>新闻列表</h1>
		<ul>
			<li 
				v-for='item in newList' 
				:key='item.id'
				@click='goDetail(item.id)'
			>
				{{item.title}}
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
export default{
	data () {
		return {
			newList:[
				{id:1,title:'麦当劳已提交元宇宙“虚拟餐厅”商标申请'},
				{id:2,title:'华为近年首次跌破前五！'},
				{id:3,title:'比特币来回割，全网24小时超20亿资'},
				{id:4,title:'车主曝特斯拉事故不走保险'},
				{id:5,title:'布已获得收购赛灵思全部必要批'}
			]
		}
	},
	methods:{
		goDetail( id ){
			this.$router.push({
				path:`/news/${id}`
			})
		}
	}
}
</script>