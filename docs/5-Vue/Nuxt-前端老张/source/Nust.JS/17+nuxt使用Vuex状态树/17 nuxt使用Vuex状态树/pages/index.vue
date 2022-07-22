<template>
  <div>
  	=== {{ imgUrl }} === 
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'IndexPage',
  computed:{
  	...mapState({
  		imgUrl:state=>state.user.imgUrl
  	})
  }
}
</script>
