<template>
  <div>
  	<News />
  	<ul>
  		<li v-for='item in list' :key='item.id'>
  			{{ item.imageName }}
  		</li>
  	</ul>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
  	return {
  		list:[],
  		items:[]
  	}
  },
  async asyncData( {$axios} ){
  	let res = await $axios.get('http://testapi.xuexiluxian.cn/api/slider/getSliders');
  	let list = res.data.data.list;
  	return {
  		list
  	}
  }
}
</script>
