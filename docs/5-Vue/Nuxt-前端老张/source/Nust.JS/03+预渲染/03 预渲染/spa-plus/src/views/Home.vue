<template>
  <div>
    <h2>Home Page</h2>
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
  metaInfo: {
    title: this.list[0].imageUrl, // set a title
    meta: [{                 // set meta
      name: '关键字,web前端',
      content: '描述'
    }]
  },
  data () {
    return {
      list:[]
    }
  },
  created(){
    axios.get('http://testapi.xuexiluxian.cn/api/slider/getSliders').then(res=>{
       this.list = res.data.data.list;
    })
  }
}
</script> 
