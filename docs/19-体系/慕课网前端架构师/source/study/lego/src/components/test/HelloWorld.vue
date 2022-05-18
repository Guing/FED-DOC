<template>
   <div>
       
       {{msg}}
       <Hello :msg="msg"></Hello>
   </div>
</template>
<script lang="ts" >
import { defineComponent } from "vue";
import Hello from './Hello.vue'
export default defineComponent({
    name:'HelloWorld',
    components:{
        Hello
    },
    props:{
        msg:{
            type:String,
            default:''
        }
    }
})
</script>
<style></style>