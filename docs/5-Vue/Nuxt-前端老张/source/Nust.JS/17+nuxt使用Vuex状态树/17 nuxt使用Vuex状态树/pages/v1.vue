<template>
  <div>
  	{{ nickname }}
  	<button @click='btn'>按钮</button>
  </div>
</template>

<script>
import { mapState  } from 'vuex'
export default {
  name: 'IndexPage',
  computed:{
  	...mapState({
  		nickname:state=>state.user.nickname
  	})
  },
  methods:{
  	btn(){
  		this.$store.commit('user/changeName','王五');
  	}
  }
}
</script>
