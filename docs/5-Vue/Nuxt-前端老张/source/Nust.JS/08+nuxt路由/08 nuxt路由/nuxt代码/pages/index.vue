<template>
  <div>
  	首页
  	<a href="/list?id=1">a链接的形式</a>
  	<nuxt-link :to="{name:'list',query:{id:1},params:{id:2}}">link的方式</nuxt-link>
  	<button @click='btn'>js跳转</button>

  	<nuxt-link to='search'>进入搜索页</nuxt-link>

  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods:{
  	btn(){
  		this.$router.push({
  			path:'/list',
  			query:{a:1}
  		});

  		// this.$router.push({
  		// 	name:'list',
  		// 	params:{b:2}
  		// });

  	}
  }
}
</script>
