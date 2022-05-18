<template>
   <div>
       {{msg}}
   </div>
</template>
<script lang="ts" >
import { defineComponent } from "vue";

export default defineComponent({
    name:'Hello',
    props:{
        msg:{
            type:String,
            default:''
        }
    }
})
</script>
<style></style>