# Day04 作业布置

## 一. 完成课堂所有的代码

已完成





## 二. 小程序中组件的插槽如何使用？如何给插槽传递默认值？

小程序中使用插槽 :

在组件中想要使用插槽的地方通过<slot> </slot>预留位置，在组件外部可以在预留插槽中插入文字、图片或者是进度条



给插槽传递默认值 :

小程序中不支持给插槽设置默认值，如果非要设置，可以通过兄弟选择器来实现 :

* 给需要传递的默认值元素上添加一个类，设置 display : none，默认不显示
* 之后在有预留插槽位置的元素设置伪类 :empty ，当里面没有内容时，再通过兄弟选择器找到默认值元素上的类，将display改为block



## 三. 注册组件实例时，都有哪些选项？（自己总结）

注册组件实例时，可以通过组件的生命周期函数触发一些特殊事件，例如 :

created   #在组件实例刚刚被创建时执行

attached  #在组件实例进入页面节点树时执行

ready  #在组件在视图层布局完成后执行

moved  #在组件实例被移动到节点树另一个位置时执行

detached  #在组件实例被从页面节点树移除时执行

error  # 组件方法抛出错误时执行



## 四. 完成小程序对网络请求的封装

封装成函数 (Fn_Request) :

``` js
// 封装网络请求函数:Fn_Request
export function Fn_Request(options) {
  // 通过promise返回数据
  return new Promise((resolve, reject) => {
    wx.request({
     ...options,
     success: (res) => {
       resolve(res.data)  //网络请求成功时回调
     },
     fail: reject  //失败时回调
    })
  })
}
```



封装成类(Class_Request) :

``` js
// 封装发送网络请求类方法:
class Class_Request {
  request(options) {
    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        success: (res) => {
          resolve(res.data)  //网络请求成功时回调
        },
        fail: reject  //失败时回调
       })
    })
  }

  get(options) {  //get方法
    return this.request({...options, method: "get"})
  }
  post(options) {  //post方法
    return this.request({...options, method: "post"})
  }
}
// 导出
export const Class_ReqInstance = new Class_Request()
```





## 五. 小程序中如何进行页面跳转？在跳转过程中如何进行数据的传递？

小程序中实现页面跳转有两种方式 :

方式一 ：通过navigator组件(用的较少，不推荐)

方式二 : 通过wx的API进行页面跳转，常用 ：

wx.navigateTo()  #保留当前页面，跳转到应用内的某个页面

wx.navigateBack()  #关闭当前页面，返回上一页面或者多级页面



页面跳转数据传递 :

` ·` 首页传递数据至详情页 (使用URL中的query字段)：

* url : "/pages/classify/index?name=wzl&age=22"



` ·` 详情页传递数据至首页(在详情页内部拿到首页实例，并修改数据) ：

* const pages = getCurrentPages() //获取实例方法
* const prevPage = pages[pages.length - 2]  //具体实例
* prevPage.setData({info: "my name is wzl"})  //修改数据

## 六. 总结小程序的登录流程，并且自己进行整理

小程序登录流程 :

1.通过wx.login()获取code

2.将这个code发送给后端，后端会返回一个token，这个token将作为你身份的唯一标识

3.将token通过wx.setStorageSync()保存在本地存储

4.用户下次进入页面时，会先通过wx.getStorageSync() 方法判断token是否有值，如果有值，则可以请求其它数据，如果没有值，则进行登录操作





## 七. 整理小程序常见的系统API，多阅读官方文档

小程序常见系统API ：

` ·`  展示弹窗API : showToast、showModal、showLoading、showActionSheet

` ·`  分享功能 ：通过onShareAppMessage()实现

` ·`  获取设备信息 : 通过wx.getSystemInfo()实现

` ·`  获取用户位置信息 : 通过wx.getLocation()获取

` ·`  本地数据存储 (常用两个)：

* 同步存储数据 : wx.setStorageSync()
* 同步获取数据 : wx.getStorageSync()















































































