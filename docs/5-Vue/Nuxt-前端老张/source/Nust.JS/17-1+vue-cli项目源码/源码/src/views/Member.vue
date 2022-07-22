<template>
  <div class="member">
      <!-- 公共头部 -->
      <MyHeader></MyHeader>
      <!-- 中间内容部分 -->
      <div class="member-content">
        <div class="content-bgpic">
          <img src="../assets/image/member/bgpic.png" alt="">
        </div>
        <div class="content-buy">
          <div class="buy-txt">欢 迎 加 入 本 站 会 员</div>
          <div class="buy-item">
            <!--体验会员-->
            <div class="item-normal" v-for="(item,index) in vipArr" :key="index" :style="'background:' + item.bgColor">
              <div class='item-title'>
                <div class="item-title-img"><img :src="item.vipIcon" alt=""></div>
                <div class="item-title-title" :style="'color:' + item.vipNameColor">{{item.vipName}}</div>
                <div class="title-tuijian" v-if="item.isRecommend === 1">
                  <img src="../assets/image/member/tuijian.png" alt="">
                </div>
              </div>
              <div class="item-desc">{{item.vipDesc}}</div>
              <div class="item-price" :style="'color:' + item.fontColor">
                <div class="item-price-fuhao">￥</div>
                <div class="item-price-num">{{ item.price }}</div>
                <div class="item-price-time">元/{{  item.termNumber }}{{ item.termType }}</div>
              </div>
              <div class="item-start-box">
                <button class="item-start-btn btn-animate" @click="setMask(item.id)" :style="'background:' + item.btnBgColor"><span :style="'color:' + item.btnFontColor"> 立即开通</span></button>
              </div>
              <ul class="item-list" >
                <li v-for="(x,y) in item.interests" :key="y">
                  <div>{{ x.label }}</div>
                  <div ><i :class="x.icon === 1 ? 'el-icon-success' : 'el-icon-error'"></i></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 公共底部 -->
      <MyFooter :webconfig="webconfig"></MyFooter>
      <!--点击开通，弹出蒙层-->
      <div class="member-mask" v-if="showDialog"></div>
      <div class="mask-box" v-if="showDialog">
        <div class="mask-close" @click="closeMask">
          <img src="../assets/image/member/close.png" alt="">
        </div>
        <div class="mask-content">
          <div class="content-top">
            <div class="top-main">
              <img :src="userAvat?userAvat:'/image/common/avator.png'" alt="">
              <p>{{userName}}</p>
            </div>
          </div>
          <div class="content-main">
            <div class="main-title">
              <p>开通<span class="vipDegree">{{ payName }}</span></p>
            </div>
            <div class="vipCards" >
              <div @click="selectedVip(i)" v-for="(i,k) in vipArr" :key="k" :class="['vipCard',[selectedId === i.id?'vipCardsBg':'']]">
                <p class="vipName">{{i.vipName}}</p>
                <p class="vipPirce"><span class="vipNumber">{{i.price}}</span>元</p>
                <p class="vipTime">{{i.termNumber}}个{{i.termType}}</p>
                <div class="card-foot">
                  <div class="vipDesc">平台所有课程免费学习</div>
                  <div class="vipStyle" >
                    <img src="/image/bigVip.png"/>
                  </div>
                </div>

              </div>
            </div>
            <div class="payPrice">
              <h3>支付方式 <span class="pay" v-if="payment">{{payment.description}}</span></h3>

              <p class="text">应付金额 <span class="num">{{goPayPrice}}元</span> <span class="alert">支付即同意成为VIP</span></p>
            </div>
            <div class="choosePayWay">
              <div  class="choosebg">
                <div v-for="(item) in payModes" :key="item.code"  @mouseup="mouseup(item)" :class="renderClass(item) + (item.selected ? ' payStyle' : '')" >
                  <i class="icon iconfont icon-zhifubaozhifu"  v-if="item.code === 'alipayment'"  ></i>
                  <span  v-if="item.code === 'alipayment'" >支付宝</span>
                  <i class="icon iconfont icon-weixin" v-if="item.code === 'wxpayment'"></i>
                  <span  v-if="item.code === 'wxpayment'">微信</span>
                </div>
              </div>
            </div>
            <div class="code">
              <div class="sameCode">
                <img class="wxCode" :src="payurl" v-if="payurl">
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import MyHeader from '../components/index/header.vue'
import MyFooter from '../components/foot/foot.vue'
import {webConfig} from '@/common/api/webConfig.js'
import {getAllVips,settlement,wxpay,zfbpay} from '@/common/api/vip.js'
import {createToken} from '@/common/api/token.js'
import { mapState, mapActions,mapMutations } from "vuex";
import {queryOrderWithAli,queryOrderWithWX} from '@/common/api/payment.js'


export default {
  data(){
    return{
      radio:'',
      showMask:false,
      showDialog: false,
      isactive:true,
      webconfig:{},
      vipArr:[],
      tokens:'',//重复提交
      token:'',//是否登录
      goPayPrice:'',
      payName:'',
      payurl:'',
      orderNumber:'',
      selectedId:'',
      userAvat:'',
      userName:'',
      timeInterVal: "",
      payModes:[],
      payment: {},
    }
  },
  metaInfo() {
    return {
      title: this.webconfig.title, // set a title
      meta: [{ // set meta
        name: this.webconfig.keywords,
        content: this.webconfig.description
      }]
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLogin: (state) => state.user.isLogin,
    }),
  },
  created() {
    this.__init()
    this.getAllVips()
    this.token = localStorage.getItem('token')
  },
  methods: {

    //更变样式
    renderClass(item){
      if(!item.selected){
        item["selected"] = false;
      }
      return "payment " + item.code;
    },
    //鼠标弹起时触发
    mouseup(payment){
      this.payModes.forEach(item => {
        item.selected = false;
      })
      payment.selected = true;
      this.payment = payment
      if(payment.code === 'wxpayment'){
        clearInterval(this.timeInterVal)
        this.wxpay()
        this.showDialog = true;
      }else if(payment.code === 'alipayment'){
        clearInterval(this.timeInterVal)
        this.zfbpay()
        this.showDialog = true;
      }
    },
    //支付宝查询订单
    queryOrderWithAli(){
      queryOrderWithAli({orderNumber: this.orderNumber}).then(res => {
        if(res.meta.code === "200"){
          clearInterval(this.timeInterVal)
          this.$router.push('/vipSuccess')
        }
      })
    },
    //微信查询订单
    queryOrderWithWX(){
      queryOrderWithWX({orderNumber: this.orderNumber}).then(res => {
        if(res.meta.code === "200"){
          clearInterval(this.timeInterVal)
          this.$router.push('/vipSuccess')
        }
      })
    },
    //微信结算接口
    wxpay(){
      wxpay({vipId:this.selectedId,isRenew:0,payModes:'wxpayment',token:this.tokens}).then(res => {
        if(res.meta.code === '200'){
          this.orderNumber = res.data.orderNumber
          this.payurl = res.data.payurl
          this.timeInterVal = setInterval(this.queryOrderWithWX, 5000)
        }else{
          this.$message({
            type:'warning',
            message:res.meta.msg
          })
          this.showDialog = false;
        }
      })
    },
    //支付宝结算接口
    zfbpay(){
      zfbpay({vipId:this.selectedId,isRenew:0,payModes:'alipayment',token:this.tokens}).then(res => {
        if(res.meta.code === '200'){
          this.orderNumber = res.data.orderNumber
          this.payurl = res.data.payurl
          this.timeInterVal = setInterval(this.queryOrderWithAli, 5000)
        }else{
          this.$message({
            type:'warning',
            message:res.meta.msg
          })
          this.showDialog = false;
        }
      })
    },
    //选中的会员等级
    selectedVip(item){
      this.goPayPrice=item.price
      this.payName=item.vipName
      this.selectedId = item.id
      if( this.payment.code = 'wxpayment'){
        this.wxpay()
      }else if(this.payment.code= 'alipayment'){
        this.zfbpay()
      }
    },
    //获取所有的会员等级
    getAllVips(){
      getAllVips().then(res => {
        res.data.list.forEach(item => {
          item["fontColor"] = "#DC985E";
          item["btnBgColor"] = "#DC985E";
          item["bgColor"] = "#ffffff";
          item["btnFontColor"] = "#ffffff";
          item["vipNameColor"] = "#333333";
          if(item.isRepeat === 0){
            item["fontColor"] = "#999999";
            item["btnBgColor"] = "#DDDDDD";
            item["bgColor"] = "#F7F8FA";
            item["btnFontColor"] = "#666666";
            item["vipNameColor"] = "#333333";
          }
          if(item.isRecommend === 1){
            item["fontColor"] = "#FFFFFF";
            item["btnBgColor"] = "linear-gradient(#FCC994, #F6A967);";
            item["bgColor"] = "#0D0D0D";
            item["btnFontColor"] = "#ffffff";
            item["vipNameColor"] = "#E0E0E0";
          }
          item.interests = JSON.parse(item.interests)
          switch (item.termType){
            case 1:
              item.termType = '日'
              break
            case 2:
              item.termType = '月'
              break
            case 3:
              item.termType = '年'
              break
          }
        })
        this.vipArr = res.data.list
      })
    },
    async __init(){
      let res = await webConfig()
      this.webconfig = res.data.data
    },
    //设置蒙层
    setMask(vipId){
      this.payurl = ""
      this.payment = ''
      this.payModes = []
      if(!this.token){
        this.$message({
          message: '请先登录才能加入购买会员哦',
          type: 'error'
        });
        this.$store.commit('saveLoginDialog', true)
        return
      }
      this.userAvat = this.userInfo.avatar
      this.userName = this.userInfo.nickName
      this.selectedId = vipId
      createToken().then(res => {
        this.tokens = res.data.token
        settlement({id:vipId,token:this.tokens}).then(res => {
          this.payModes = res.data.payModes
          this.goPayPrice = res.data.totalPrice
          this.payName = res.data.vipInfo.vipName
        })
      })
      this.showDialog = true;
    },
    //关闭蒙层
    closeMask(){
      clearInterval(this.timeInterVal)

      this.showDialog = false
    },
  },
  components:{
    MyHeader,
    MyFooter
  }
};
</script>

<style scoped>
.payStyle{
  background: url("/image/checkedVip.png") no-repeat;
  background-size: 220px 111px;
  background-position: -67px -59px;
  border: #ff470a solid 1px !important;
}
.payment i {
  font-size: 35px;
  margin-right: 10px;
}
.payment span {
  line-height: 50px;
  color: #222222;
  font-weight: bold;
}
.payment{
  width: 130px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
  line-height: 50px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0 10px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.choosebg{
  display: flex;
}
.alipayment{
  border: #bfbfbf solid 1px;
  color: #01a8eb;
}
.wxpayment{
  border: #bfbfbf solid 1px;
  color: #01af37;
}
  .member-content{
    width: 100%;
    margin: 0 auto;
  }
  .content-bgpic{
    width: 100%;
    height: 150px;
  }
  .content-bgpic img{
    width: 100%;
    height: 100%;
  }
  .content-buy{
    padding: 1px 0 0 0;
    width: 1300px;
    margin: 0 auto;
    /*background: cyan;*/
  }
  .buy-txt{
    width: 1200px;
    text-align: center;
    height: 40px;
    font-family: 'Microsoft YaHei';
    font-size: 32px;
    font-weight: 700;
    margin:  35px auto;
    background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: hue 30s infinite linear;
  }
  @-webkit-keyframes hue {
    from {
      -webkit-filter: hue-rotate(0deg);
    }
    to {
      -webkit-filter: hue-rotate(-360deg);
    }
  }
  .buy-item{
    /* position: relative; */
    width: 1300px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 0 100px 0;
  }
  .buy-item .item-normal{
    padding: 15px;
    width: 296px;
    height: 550px;
    background: #F7F8FA;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    position: relative;
    /*box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
  }
  .item-normal-one{
    background: #FFFFFF;
  }
  .buy-item .item-normal.item-normal-three{
    background-color: #0D0D0D;
  }
  /* 会员卡片内部样式 */
  /*标题*/
  .item-title{
    display: flex;
    align-items: center;
    width: 100%;
    height: 28px;
    position: relative;
    /*background: #cccccc;*/
  }
  .title-tuijian{
    position: absolute;
    top: -30px;
    right: -42px;
    width: 150px;
    height: 150px;
  }
  .title-tuijian img{
    width: 100%;
    height: 100%;
  }
  .item-title .item-title-img{
    width: 26px;
    height: 26px;
  }
  .item-title .item-title-img img{
    width: 100%;
    height: 100%;
  }
  .item-title-title{
    margin-left: 10px;
    font-size: 22px;
    font-weight: bold;
  }
  .title-title-three{
    color: #e0e0e0;
  }
  /*描述*/
  .item-desc{
    width: 100%;
    height: 18px;
    margin-top: 15px;
    /*background: #00ac06;*/
    font-size: 14px;
    color: #999999;
  }

  /*价格*/
  .item-price{
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    /*width: 135px;*/
    height: 59px;
    margin-top: 25px;
    /*background: #2c80ff;*/
    color: #999999;
  }

  .item-price-num{
    font-size: 38px;
    font-weight: 700;
    line-height: 34px;
  }

  /*按钮*/
  .item-start-box{
    display: flex;
    align-items: center;
    width: 100%;
    height: 126px;
    border-bottom: 1px solid;
    border-bottom-color: #eeeeee;
  }
  .item-start-btn{
    width: 100%;
    height: 50px;
    outline: none;
    border: none;
    font-size: 18px;
    color: #666666;
    border-radius: 4px;
    cursor: pointer;
  }

  .item-start-btn:hover{
    box-shadow:0px 0px 3px #999999;
  }
  /*.item-start-btn-one:hover{*/
  /*  box-shadow:3px 5px 5px #cccccc;*/
  /*}*/

  /*列表*/
  .item-list{
    padding: 10px 0;
    width: 100%;
    height: 244px;
    /*background: deeppink;*/
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: #666666;
  }
  .item-list li{
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }
  .item-list li:first-child{
    font-weight: bold;
  }
  .item-list-one li:first-child{
    font-weight: bold;
    color: #DC985E;
  }

  .item-list-three li:first-child{
    font-weight: bold;
    color: #DC985E;
  }

  /*遮罩层样式*/
  .member-mask{
    position: fixed;
    top: 0;
    left: 0;
    bottom:0;
    right:0;
    background: rgba(0,0,0,.5);
    z-index: 888;
  }
  .mask-box{
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%,-50%);
  }
  .mask-close{
    position: absolute;
    right: 0;
    top: 15px;
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
  .mask-close img{
    width: 100%;
    height: 100%;
  }
  .mask-content{
    width: 1200px;
    min-height: 600px;
    margin-top: 55px;
    background-color: #F5F5F5;
    border-radius: 7px;
    position: relative;
  }
  .content-top{
    width: 100%;
    height: 150px;
    /*background-color: red;*/
    background: url("../assets/image/member/maskbg.png");
    background-size: 100% 100%;
  }
  .top-main{
    /*width: 200px;*/
    height: 45px;
    /*background-color: #F6A967;*/
    margin: 0 40px;
    align-items: center;
    display: flex;
  }
  .top-main img{
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .top-main p{
    margin-left: 10px;
    line-height: 45px;
    font-size: 12px;
  }
  .top-main p:last-child{
    margin-left: 15px;
    color: #333333;
    opacity: .4;
  }
  .content-main{
    width: 1120px;
    background-color: #FFF;
    border-radius: 7px;
    position: absolute;
    margin: 0 40px;
    top: 50px;
    left: 0;
  }
  .main-title{
    width: 100%;
    height: 50px;
    position: relative;
    border-bottom: 1px solid #cccccc;
  }
  .main-title p{
    position: absolute;
    top: 39%;
    left: 50%;
    transform: translate(-50%,-33%);
    height: 40px;
    /*background-color: yellow;*/
    font-size: 24px;
    text-align: center;
    line-height: 45px;
    border-bottom: 5px solid;
    color: red;
  }
  .vipCards{
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }
  .vipCardsBg{
    background: url("/image/checkedVip.png") no-repeat;
    background-size: 250px 150px;
    background-position: 0px 0px;
  }

  selectedStyle{
    width: 250px;
    height: 180px;
    text-align: center;
    border-radius: 8px;
    /*background: red;*/
    z-index: 10;
  }
  .vipCard{
    width: 250px;
    height: 150px;
    text-align: center;
    border: 1px solid #BFBFBF;;
    /*background: url("/image/checkedVip.png") no-repeat;*/
    cursor: pointer;
    border-radius: 8px;
    z-index: 10;
  }
  .vipName{
    margin-top: 15px;
    font-size: 14px;
    color: #595959;
  }
  .vipPirce{
    margin:20px 0 5px 0;
    font-size: 12px;
    color: #595959;
  }
  .vipNumber{
    color: #FF4E2C;
    font-size: 30px;
  }
  .vipTime{
    color: #8C8C8C;
    font-size: 12px;
  }
  .card-foot{
    display: flex;
    justify-content: center;
  }
  .vipDesc{
    color: #8C8C8C;
    font-size: 14px;
    margin-top: 10px;
  }
  .vipDescContent{
    display: flex;

  }
  .vipStyle{
    width: 33px;
    height: 12px;
    margin-top: 8px;
  }
  .vipStyle img{
    width: 100%;
    height: 100%;

  }
  .payPrice{
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    margin-right: 12px;
    text-align: right;
  }
  .text{
    color: #595959;
    font-size: 14px;
  }
  .payPrice .num{
    color: #FF4E2C;
    font-size: 30px;
  }
  .alert{
    font-size: 12px;
    color: #B2B2B2;
    padding-left: 10px;
  }
  .code{
    display: flex;
    justify-content: space-around;
  }
  .sameCode{
    width: 180px;
    height: 180px;
    border: #cccccc dashed 1px;
    position: relative;
    margin-bottom: 20px;
  }
  .sameCode:before{
    content: "选择支付方式";
    color: #2c80ff;
    text-align: center;
    position: absolute;
    z-index: 2;
    line-height: 30px;
    width: 100px;
    margin: 75px 40px;
    background: rgba(255,255,255,.5);
  }
  .sameCode:after{
    content: " ";
    width: 180px;
    height: 180px;
    display: block;
    background: url("/image/pay-bg.jpg") no-repeat;
    position: absolute;
    z-index: 1;
  }
  .sameCode img{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 9998;
  }
  .someAlert{
    display: flex;
    justify-content:center ;
  }
  .wxDesc,.zfbDesc{
    width: 30px;
    height: 30px;
  }
  .sameCode .alert{
    margin-left: 10px;
    font-size: 14px;
    color: #595959;
  }
  .choosePayWay{
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-bottom:5px;
  }
  .payPrice h3{
    margin-left: 15px;
    font-size: 16px;
    color: #8C8C8C;
  }
  .payPrice .pay{
    font-size: 18px;
    color: #FF4E2C;
  }
  .radioStyle{
    height: 21px;
    line-height: 21px;
    margin-left: 20px;
    margin-top: 4px;
  }
</style>
