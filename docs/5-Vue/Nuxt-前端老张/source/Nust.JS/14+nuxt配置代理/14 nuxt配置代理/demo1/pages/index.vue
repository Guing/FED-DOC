<template>
  <div>
  	=== {{ a }} ===
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData( { $axios} ){
  	let res = await $axios.get('/api/list');
  	return {
  		a:res.data.a
  	}
  }
}
</script>
