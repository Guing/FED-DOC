<template>
  <div>
  	首页 
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
  name: 'IndexPage',
  data () {
  	return {
  		list:[],
  	}
  },
  head(){
  	return {
	    title: this.list[0].imageUrl, // 网站标题
	    meta: [
	      { hid: 'description', name: 'description', content: '描述' },
	      { hid: 'keywords', name: 'keywords', content: '关键词' }
	    ]
    }
  },
  async asyncData(){
  	let res = await axios.get('http://testapi.xuexiluxian.cn/api/slider/getSliders');
  	return {
  		list:res.data.data.list
  	}
  }
  
}
</script>
