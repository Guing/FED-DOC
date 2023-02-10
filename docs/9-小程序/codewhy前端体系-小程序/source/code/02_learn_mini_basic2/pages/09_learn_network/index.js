// pages/09_learn_api/index.js
import { hyRequest, hyReqInstance } from "../../service/index"

Page({
  data: {
    allCities: {},
    houselist: [],
    currentPage: 1
  },
  async onLoad() {
    // 1.网络请求基本使用
    // wx.request({
    //   url: "http://codercba.com:1888/api/city/all",
    //   success: (res) => {
    //     const data = res.data.data
    //     this.setData({ allCities: data })
    //   },
    //   fail: (err) => {
    //     console.log("err:", err);
    //   }
    // })

    // wx.request({
    //   url: 'http://codercba.com:1888/api/home/houselist',
    //   data: {
    //     page: 1
    //   },
    //   success: (res) => {
    //     const data = res.data.data
    //     this.setData({ houselist: data })
    //   }
    // })

    // 2.使用封装的函数
    // hyRequest({ 
    //   url: "http://codercba.com:1888/api/city/all" 
    // }).then(res => {
    //   this.setData({ allCities: res.data })
    // })

    // hyRequest({
    //   url: "http://codercba.com:1888/api/home/houselist",
    //   data: {
    //     page: 1
    //   }
    // }).then(res => {
    //   this.setData({ houselist: res.data })
    // })

    // 3.await/async
    // const cityRes = await hyRequest({ 
    //   url: "http://codercba.com:1888/api/city/all" 
    // })
    // this.setData({ allCities: cityRes.data })

    // const houseRes = await hyRequest({
    //   url: "http://codercba.com:1888/api/home/houselist",
    //   data: { page: 1 }
    // })
    // this.setData({ houselist: houseRes.data })

    // 4.将请求封装到一个单独函数中(推荐)
    this.getCityData()
    this.getHouselistData()

    // 5.使用类的实例发送请求
    hyReqInstance.get({
      url: "/city/all"
    }).then(res => {
      console.log(res);
    })
  },

  async getCityData() {
    const cityRes = await hyRequest({ 
      url: "http://codercba.com:1888/api/city/all" 
    })
    this.setData({ allCities: cityRes.data })
  },
  async getHouselistData() {
    const houseRes = await hyRequest({
      url: "http://codercba.com:1888/api/home/houselist",
      data: { page: this.data.currentPage }
    })
    const finalHouseList = [...this.data.houselist, ...houseRes.data]
    this.setData({ houselist: finalHouseList })
    // 思考: 为什么这里不需要setData?
    this.data.currentPage++
  },

  onReachBottom() {
    this.getHouselistData()
  }
})