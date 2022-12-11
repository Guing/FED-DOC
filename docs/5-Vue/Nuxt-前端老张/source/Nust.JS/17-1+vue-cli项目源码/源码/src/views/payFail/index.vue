<template>
    <div>
        <index-header></index-header>
        <div class="container">
            <div class="pay">
                <img src="/image/payfail.png" alt="">
            </div>
            <h1>真遗憾，支付失败！</h1>
            <div class="btns">
                <div class="btn payAgain" @click="payAgain"><span class="alert">再次支付</span></div>
                <div class="btn goCart" @click="goCart"><span class="alert">返回购物车</span></div>
            </div>
            <div class="out">将在<span>{{count}}</span>秒后退出</div>
        </div>
    </div>
</template>

<script>
import indexHeader from '@/components/index/header.vue'
export default {
	name: 'payFail.vue',
	data() {
		return {
      count: 5,
			timer: '',
			webconfig: {},
		}
	},

	components: {
		indexHeader,
	},
	mounted() {
		this.timer = setInterval(this.out, 1000)
	},
	methods: {
		//再次支付
		payAgain() {
			this.$router.go(-1)
      clearInterval(this.timer)
		},
		//返回购物车页面
		goCart() {
      this.$router.push('/cart')
      clearInterval(this.timer)
		},
		//定时器
		out() {
			this.count--
			if (this.count == 0) {
        this.$router.push('/about/order')
        clearInterval(this.timer)
			}
		},
	},
}
</script>

<style scoped>
.container {
	width: 1200px;
	margin: 0 auto;
	background: #fafafa;
}
.pay {
	width: 350px;
	height: 350px;
	padding-top: 100px;
	margin: 0 auto;
}
.pay img {
	width: 100%;
	height: 100%;
}
.container h1 {
	text-align: center;
	color: #707070;
}
.btns {
	width: 350px;
	margin: 20px auto;
	text-align: center;
	display: flex;
}
.btn {
	width: 151px;
	height: 51px;
	line-height: 51px;
	border-radius: 4px;
	cursor: pointer;
}
.payAgain {
	margin-right: 47px;
	background: linear-gradient(90deg, #fc7979 0%, #da4848 100%);
	color: #ffffff;
}
.goCart {
	background: rgba(54, 137, 255, 0.22);
	color: #3692ff;
}
.alert {
	width: 80px;
	height: 26px;
	font-size: 20px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	line-height: 0px;
}
.out {
	padding-top: 10px;
	margin: 0 auto;
	width: 119px;
	font-size: 14px;
	color: rgba(51, 51, 51, 0.37);
}
</style>
