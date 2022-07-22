<template>
  <div>
  	{{ str }}
  	<button @click='btn'>修改str</button>

  	<nuxt-link to="/list">跳转到list</nuxt-link>

  </div>
</template>

<script>
export default {
  data () {
  	return {
  		str:'123'
  	}
  },
  methods:{
  	btn(){
  		this.str = '456';
  	}
  },
  name: 'IndexPage',
  // middleware:'auth'
  // middleware(){
  // }
  validate({params,query}){
  	console.log('validate');
  	//return /^\d+$/.test(query.id);
  	return true;
  },
  asyncData({store,params}){
  	console.log( 'asyncData' )
  },
  fetch({app,store,params}){
  	console.log( 'fetch' )
  },
  beforeCreate(){
  	console.log( 'beforeCreate' );
  },
  created(){
  	console.log( 'created' );
  },
  beforeMount(){
  	console.log( 'beforeMount' ); 
  },
  mounted(){
  	console.log('mounted');
  },
  beforeUpdate(){
  	console.log('beforeUpate');
  },
  updated(){
  	console.log('updated');
  },
  beforeDestroy(){
	console.log('beforeDestroy');
  },
  destroyed(){
	console.log('destroyed');
  }
}
</script>
