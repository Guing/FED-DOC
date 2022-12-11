<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>
    	id ： {{ id }}
    </h2>
  </div>
</template>
<script type="text/javascript">
export default{
	data () {
		return {
			id:0
		}
	},
	created(){
		this.id = this.$route.query.id
	}
}
</script>
