<template>
  <div class="home">
  	<h1>这是首页</h1>
    <ul>
    	<li v-for='(item,index) in list' :key='index'>
    		{{ item.imageUrl }}
    	</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Home",
  data (){
  	return {
  		list:[]
  	}
  },
  async created(){
  	let res = await axios.get('http://testapi.xuexiluxian.cn/api/slider/getSliders');
  	this.list = res.data.data.list;
  }
};
</script>
