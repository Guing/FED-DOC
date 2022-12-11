<template>
  <div>
  	<nuxt-link to='/login'>登录</nuxt-link>
  	<nuxt-link to='/my'>我的</nuxt-link>
  	<nuxt-link to='/news'>新闻</nuxt-link>

  	{{ list }}
  </div>
  	
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData( {$axios}){
  	let res = await $axios.get('/api/slider/getSliders');
  	return {
  		list:res.data.list
  	}
  }
}
</script>
