import hyRequest from "..";

// 发送网络请求
// hyRequest.post
interface IHomeData {
  data: any,
  returnCode: string,
  success: boolean
}

hyRequest.request<IHomeData>({
  url: "/home/multidata"
}).then(res => {
  console.log(res.data, res.success, res.returnCode)
})
