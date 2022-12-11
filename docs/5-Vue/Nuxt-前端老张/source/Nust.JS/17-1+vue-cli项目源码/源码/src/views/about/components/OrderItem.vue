<template>
  <div class="order-item-ins">
    <div v-if="orderList.length > 0" class="order-container">
      <!-- <happy-scroll style="width: 940px;"> -->
        <div style="width: 940px">
          <div class="order-item" v-for="item in orderList" :key="item.id">
            <div class="item-top">
              <img
                class="order-img"
                src="/image/about/order-select.png"
                alt=""
              />
              <p class="order-num">订单编号：{{ item.orderNumber }}</p>
              <p class="order-time">{{ dateFormat('YYYY-mm-dd HH:MM',item.createTime) }}</p>
              <p class="changeCode" v-if="item.isUsedExchangeCode === 1">兑换码：{{item.exchangeCode}}</p>
            </div>
            <div
              class="item-bottom"
              v-for="course in item.historyOrderCourseVos"
              :key="course.courseId"
              v-if="item.orderType === 1"
            >
              <div class="i-b-left">
                <div class="i-b-l-left" @click="goStu(course.courseId)">
                  <img :src="course.courseCover" :alt=" course.courseName" />
                  <!-- <p>晋级TS高手搞定复杂项目</p> -->
                </div>
                <div class="i-b-l-right" style="width: 400px">
                  <p class="i-b-l-r-title" @click="goStu(course.courseId)">
                    {{ course.courseName }}
                  </p>
                  <p class="i-b-l-r-tip">{{ course.description }}</p>
                  <p class="i-b-l-r-price">
                    价格 <span>￥{{ course.discountPrice }}</span>
                  </p>
                </div>
              </div>
              <div class="i-b-center">
                <div class="i-b-c-price">
                  <p class="i-b-c-p-single">价格 ￥{{ course.discountPrice }}</p>
                  <p class="i-b-c-p-total">合计 ￥{{ item.payPrice }}</p>
                  <p class="i-b-c-p-pay" v-if="item.isPay === 1">实付 ￥<span>{{ item.payPrice }}</span></p>
                  <p class="i-b-c-p-pay" v-if="item.isPay === 2">实付 ￥<span style="text-decoration:line-through">{{ item.payPrice }}</span></p>
                </div>
              </div>
              <div class="i-b-right">
                <div
                  v-if="item.isPay === 1 && item.status === 1"
                  class="i-b-r-btn success"
                >
                  已完成
                </div>
                <div
                  v-if="
                    item.isPay === 2 && (item.status === 1 || item.status === 4)
                  "
                  class="i-b-r-btn error"
                >
                  未完成
                </div>
                <div
                  v-if="item.isPay === 2 && item.status === 3"
                  class="i-b-r-btn info"
                >
                  已失效
                </div>
              </div>
            </div>
            <div   v-if="item.orderType === 2" class="item-bottom">
              <div class="i-b-left">
                <div class="i-b-l-left">
                  <img src="/image/vipBg.png" />
                </div>
                <div class="i-b-l-right" style="width: 400px">
                  <p class="i-b-l-r-title" v-if="item.isUsedExchangeCode === 1">兑换会员</p>
                  <p class="i-b-l-r-title" v-else-if="item.memberVipVo">{{item.memberVipVo.vipName}}</p>
                  <p class="i-b-l-r-title" v-else>购买会员</p>
                  <br>
                  <p class="i-b-l-r-price">
                    价格 <span>￥{{ item.payPrice }}</span>
                  </p>
                </div>
              </div>
              <div class="i-b-center">
                <div class="i-b-c-price">
                  <p class="i-b-c-p-total">价格 ￥{{ item.payPrice }}</p>
                  <p class="i-b-c-p-pay" v-if="item.isPay === 1">实付 ￥<span>{{ item.payPrice }}</span></p>
                  <p class="i-b-c-p-pay" v-if="item.isPay === 2">实付 ￥<span style="text-decoration:line-through">{{ item.payPrice }}</span></p>
                </div>
              </div>
              <div class="i-b-right">
                <div
                    v-if="item.isPay === 1 && item.status === 1"
                    class="i-b-r-btn success"
                >
                  已完成
                </div>
                <div
                    v-if="
                    item.isPay === 2 && (item.status === 1 || item.status === 4)
                  "
                    class="i-b-r-btn error"
                >
                  未完成
                </div>
                <div
                    v-if="item.isPay === 2 && item.status === 3"
                    class="i-b-r-btn info"
                >
                  已失效
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- </happy-scroll> -->
    </div>
    <div v-else class="order-empty">
      <el-empty
        image="/image/about/order-empty.png"
        description="暂无订单"
      ></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderList: {
      type: Array,
      default: [],
    },
  },
  methods: {
    dateFormat(fmt, date) {
      let crtTime = new Date(date)
      let ret;
      const opt = {
        "Y+": crtTime.getFullYear().toString(), // 年
        "m+": (crtTime.getMonth() + 1).toString(), // 月
        "d+": crtTime.getDate().toString(), // 日
        "H+": crtTime.getHours().toString(), // 时
        "M+": crtTime.getMinutes().toString(), // 分
        "S+": crtTime.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    goStu(id){
      this.$router.push({
        path: '/course-info/'+id
      })
    }
  },

};
</script>

<style scoped>
/*会员订单*/
.vipOrder{
  display: flex;
  justify-content: space-between;
}

.getVipWay,.changeCode{
  font-size: 16px;
  color: #333;
  padding:5px 0;
}
.order-container {
  margin: 10px 0;
  width: 940px;
  height: 100%;
  overflow: hidden;
}
.order-item {
  width: 100%;
  /*height: 240px;*/
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.item-top {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid rgba(112, 112, 112, 0.3);
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}
.item-top .changeCode{
  font-size: 12px;
  color: #333333;
  margin: 0 0 0 260px;
  /*margin-right: 0;*/
}
.order-img {
  width: 15px;
  height: 19px;
}
.order-num {
  /* padding: 0 40px; */
  padding-right: 40px;
  padding-left:10px;
}
.item-bottom {
  width: 100%;
  height: 150px;
  margin-top: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.i-b-left {
  width: 450px;
  height: 100%;
  display: flex;
  align-items: center;
}
.i-b-l-left {
  width: 200px;
  height: 100px;
  position: relative;

}
.i-b-l-left img {
  width: 200px;
  height: 100px;
  cursor: pointer;
}
.i-b-l-left p {
  width: 110px;
  height: 60px;
  white-space: wrap;
  cursor: pointer;
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold;
  color: #ffffff;
  text-shadow: 2px 4px 4px rgba(27, 39, 94, 0.75);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.i-b-l-right {
  padding-left: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(112, 112, 112, 0.2);
}
.i-b-l-r-title {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  cursor: pointer;
}
.i-b-l-r-tip {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #999;
  margin: 10px 10px 10px 0;
  display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.i-b-l-r-price {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}
.i-b-l-r-price span {
  color: #ff3f3f;
}

.i-b-center {
  width: 220px;
  height: 100%;
  display: flex;
  align-items: center;
}
.i-b-c-price {
  width: 220px;
  /* height: 100px; */
  border-right: 1px solid rgba(112, 112, 112, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #93999f;
}
.i-b-c-p-total {
  margin: 5px 0;
}
.i-b-c-p-pay span {
  color: #ff3f3f;
}
.i-b-right {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.i-b-r-btn {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;

  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;

  border-radius: 4px;
}
.success {
  border: 1px solid #00ac06;
  color: #00ac06;
  background: rgba(0, 179, 6, 0.2);
}
.error {
  border: 1px solid #ff0707;
  color: #ff0707;
  background: rgba(255, 7, 7, 0.2);
}
.info {
  border: 1px solid #656565;
  color: #656565;
  background: rgba(101, 101, 101, 0.2);
}
</style>
