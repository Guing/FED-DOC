// pages/06_learn_event/index.js
Page({
  data: {
    titles: ["手机", "电脑", "iPad", "相机"],
    currentIndex: 0
  },

  onItemTap(event) {
    const currentIndex = event.currentTarget.dataset.index
    console.log(currentIndex);
    this.setData({ currentIndex })
  },

  // 绑定事件监听函数
  onBtnTap(event) {
    console.log("onBtnTap:", event);
  },
  onOuterViewTap(event) {
    // 1.target触发事件的元素
    // 2.currentTarget处理事件的元素
    console.log("onOuterViewTap:", event);
    console.log(event.target);
    console.log(event.currentTarget);

    // 3.获取自定义属性: name
    const name = event.currentTarget.dataset.name
    console.log(name);
  },

  // 监听触摸事件
  onTouchTap(event) {
    console.log("tap:", event);
  },
  onLongPress(event) {
    console.log("long:", event);
  },
  onTouchEnd(event) {
    console.log("end:", event);
  },

  // 监听事件, 并且传递参数
  onArgumentsTap(event) {
    console.log("onArgumentsTap:", event);
    const { name, age, height } = event.currentTarget.dataset
    console.log(name, age, height);
  },

  // 捕获和冒泡过程
  onView1CaptureTap() {
    console.log("onView1CaptureTap");
  },
  onView2CaptureTap() {
    console.log("onView2CaptureTap");
  },
  onView3CaptureTap() {
    console.log("onView3CaptureTap");
  },
  onView1Tap() {
    console.log("onView1Tap");
  },
  onView2Tap() {
    console.log("onView2Tap");
  },
  onView3Tap() {
    console.log("onView3Tap");
  },

  // mark的数据传递
  onMarkTap(event) {
    console.log(event);
    const data1 = event.target.dataset
    console.log(data1);

    const data2 = event.mark
    console.log(data2);
  }
})