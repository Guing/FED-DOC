<template>
  <div class="home">
    <button @click='goAbout'>跳转按钮</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods:{
  	goAbout(){
  		this.$router.push({
  			path:'/about',
  			query:{
  				id:2
  			}
  		})
  	}
  }
};
</script>
