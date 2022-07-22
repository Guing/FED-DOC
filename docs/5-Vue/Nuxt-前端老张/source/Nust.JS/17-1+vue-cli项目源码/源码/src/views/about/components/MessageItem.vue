<template>
  <div class="my-course-content">
    <div v-if="messList && messList.length > 0" style="width: 980px">
      <div class="course-main" style="width: 980px">
        <div
          class="course-item"
          v-for="(item,index) in messList"
          :key="item.id"
          @click="goRead(item)"
          @mouseenter="showDelete(index)"
          @mouseleave="closeDelete"
          :class="cur === index ? 'active':''"
        >
          <div class="item-dot" v-if="item.status === 1"></div>
          <div class="item-main">
            <p class="title">{{ item.title }} </p>
            <p class="time">{{ dateFormat(item.createTime, 'yyyy-MM-dd hh:mm:ss') }}</p>
          </div>
          <div class="delete" v-show="cur === index" @click="goDelete(item.id)">
            <img src="/image/about/remove.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="course-empty">
      <el-empty
        image="/image/about/mess-empty.png"
        description="暂无消息"
      ></el-empty>
    </div>
  </div>
</template>

<script>
import {makeRead,deleteMess} from '@/common/api/message'
import {createToken} from '@/common/api/token'
import  {Loading} from 'element-ui'
export default {
  props: {
    messList: {
      type: Array,
      default: [],
      cur: 0,
      // 已读数组
      // idArr: []
      // isDelete: false,
    },
  },
  data() {
    return {
      cur: -1,
      // isDelete: false,
    };
  },
  onLoad() {
    //
  },
  methods: {
    showDelete(index){
      this.cur = index
    },
    closeDelete(){
      this.cur = -1;
    },
    goDelete(id){
      var deleteloading = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      createToken().then(res=>{
        let arr = []
        arr.push(id)
        deleteMess({
          token:res.data.token,
          ids: arr
        }).then(ress=>{
          if(ress.meta.code === '200'){
            this.$message({
              message: '删除成功',
              type:'success'
            })
            this.$nextTick(() => {
              // 以服务的方式调用的 Loading 需要异步关闭
              deleteloading.close();
            });
            window.location.reload()
          }else {
            this.$message({
              message: ress.meta.code,
              type:'warning'
            })
            this.$nextTick(() => {
              // 以服务的方式调用的 Loading 需要异步关闭
              deleteloading.close();
            });
          }
        }).catch(err=>{
          this.$message({
            message: err.meta.msg,
            type:'error'
          })
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            deleteloading.close();
          });
        })
      })
    },
    dateFormat(datetime, fmt){
        datetime = new Date(datetime)
        var o = {
            "M+": datetime.getMonth() + 1, //月份
            "d+": datetime.getDate(), //日
            "h+": datetime.getHours(), //小时
            "m+": datetime.getMinutes(), //分
            "s+": datetime.getSeconds(), //秒
            "q+": Math.floor((datetime.getMonth() + 3) / 3), //季度
            "S": datetime.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    goRead(item){
      // 2是已读
      if(item.status === 2) {
        return;
      }else if(item.status === 1) {
        var readloading = Loading.service({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        // 1是未读
        // ids
        //this.ids.push(item.id)
        const idArr = []
        idArr.push(item.id)
        createToken().then(res => {
          makeRead({
            ids: idArr,
            token: res.data.token
          }).then(res=> {
            if(res.meta.code === '200'){
              this.$message({
                message: "已读消息成功",
                type: "success",
              });
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                readloading.close();
              });
              // window.location.reload()
              this.$router.go(0);
            }else {
              this.$message({
                message: res.meta.msg,
                type: "error",
              });
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                readloading.close();
              });
            }
          }).catch(err=>{
            this.$message({
              message: err.meta.msg,
              type: "error",
            });
            this.$nextTick(() => {
              // 以服务的方式调用的 Loading 需要异步关闭
              readloading.close();
            });
          })
        })

      }
    }
  },
};
</script>

<style scoped>
.active{
  background-color: rgba(0,0,0,.1);

}
.my-course-content {
  width: 100%;
  /* height: 400px; */
  margin-bottom: 30px;
}
.course-empty {
  height: 500px;
  width: 100%;
  position: relative;
  margin-top: 50px;
}

.course-item {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-top: 10px;
  line-height: 19px;
  position: relative;
  cursor: pointer;
  border-bottom: 1px solid rgba(112, 112, 112, 0.3);
}
.item-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: red;
  position: absolute;
  left: 5px;
  top: 20px;
}
.item-main {
  width: 400px;
  display: flex;
  flex-direction: column;
  height: 40px;
  margin-left: 20px;
}
.item-main .title {
  width: 900px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #666666;
}
.item-main .time {
  font-size: 12px;
  margin-top: 5px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #666666;
}
.item-active {
  background: #f8f8f8;
}
.delete {
  width: 20px;
  height: 21px;
  position: absolute;
  right: 0px;
  top: 10px;
}
.delete img {
  width: 20px;
  height: 21px;
}
</style>
