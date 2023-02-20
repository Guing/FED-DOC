// pages/07_learn_cpns/index.js
Page({
  data: {
    digitalTitles: ['电脑', '手机', 'iPad']
  },
  onSectionTitleClick(event) {
    console.log("区域title发生了点击", event.detail);
  },
  onTabIndexChange(event) {
    const index = event.detail
    console.log("点击了", this.data.digitalTitles[index]);
  },
  onExecTCMethod() {
    // 1.获取对应的组件实例对象
    const tabControl = this.selectComponent(".tab-control")

    // 2.调用组件实例的方法
    tabControl.test(2)
  }
})