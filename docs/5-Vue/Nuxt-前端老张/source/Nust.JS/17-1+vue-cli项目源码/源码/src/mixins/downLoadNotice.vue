<template>

</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'downLoadNotice',
    computed: {
      ...mapState({
      'progressList': state => state.caseInformation.progressList
    })
    },
    data() {
      return {
        notify: {} // 用来维护下载文件进度弹框对象
      }
    },
    watch: { // 监听进度列表
      progressList: {
        handler(n) {
          let data = JSON.parse(JSON.stringify(n))
          data.forEach(item => {
            const domList = [...document.getElementsByClassName(item.path)]
            if (domList.find(i => i.className == item.path)) { // 如果页面已经有该进度对象的弹框，则更新它的进度progress
              domList.find(i => i.className == item.path).innerHTML = item.progress + '%'
            } else {
              if (item.progress === null) { // 此处容错处理，如果后端传输文件流报错，删除当前进度对象
                this.$store.commit('caseInformation/DEL_PROGRESS', item.path)
                return
              }// 如果页面中没有该进度对象所对应的弹框，页面新建弹框，并在notify中加入该弹框对象，属性名为该进度对象的path(上文可知path是唯一的)，属性值为$notify(element ui中的通知组件)弹框对象
              this.notify[item.path] = this.$notify.success({
                // title: 'Info',
                dangerouslyUseHTMLString: true,
                message: `<p style="width: 100px;">正在下载<span class="${item.path}" style="float: right">${item.progress}%</span></p>`, // 显示下载百分比，类名为进度对象的path(便于后面更新进度百分比)
                showClose: false,
                duration: 0
              })
            }
            console.log(item.progress + '%', '-------------------------->')

            if (item.progress == 100) { // 如果下载进度到了100%，关闭该弹框，并删除notify中维护的弹框对象
              this.notify[item.path].close()
              // delete this.notify[item.path] 上面的close()事件是异步的，这里直接删除会报错，利用setTimeout，将该操作加入异步队列
              setTimeout(() => {
                delete this.notify[item.path]
              }, 1000)
              this.$store.commit('caseInformation/DEL_PROGRESS', item.path)// 删除caseInformation中state的progressList中的进度对象
            }
          })
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>